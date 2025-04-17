import os
import io
import zipfile
from flask import Flask, render_template, request, send_file, jsonify
from werkzeug.utils import secure_filename
from pptx import Presentation
from pptx.enum.shapes import MSO_SHAPE_TYPE
from PIL import Image
from collections import Counter
import shutil
import tempfile
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # 啟用CORS以允許Next.js前端連接
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['OUTPUT_FOLDER'] = 'outputs'
app.config['MAX_CONTENT_LENGTH'] = 32 * 1024 * 1024  # 32MB max upload size
MAX_FILE_SIZE_MB = 30  # 展示給用戶的最大文件大小限制

# 確保上傳和輸出目錄存在
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)

# 從原始腳本中提取的函數
def extract_dominant_colors(image_path, num_colors=5):
    img = Image.open(image_path)
    img = img.convert('RGB')
    pixels = list(img.getdata())
    color_counts = Counter(pixels)
    dominant_colors = color_counts.most_common(num_colors)
    return [{'rgb': color, 'count': count} for color, count in dominant_colors]

def rgb_to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

def process_ppt(ppt_path, output_dir):
    prs = Presentation(ppt_path)
    images_dir = os.path.join(output_dir, 'images')
    os.makedirs(images_dir, exist_ok=True)
    
    md_content = []
    all_colors = []
    image_counter = 0
    
    for slide_number, slide in enumerate(prs.slides, 1):
        md_content.append(f'\n## Slide {slide_number}\n')
        
        for shape in slide.shapes:
            if shape.has_text_frame:
                for paragraph in shape.text_frame.paragraphs:
                    text = paragraph.text.strip()
                    if text:
                        md_content.append(text + '\n')
            
            if shape.shape_type == MSO_SHAPE_TYPE.PICTURE:
                image_counter += 1
                image_path = os.path.join(images_dir, f'image_{image_counter}.png')
                image = shape.image
                with open(image_path, 'wb') as f:
                    f.write(image.blob)
                md_content.append(f'![Slide {slide_number} Image {image_counter}](images/image_{image_counter}.png)\n')
                
                # 分析圖片顏色
                colors = extract_dominant_colors(image_path)
                all_colors.extend([color['rgb'] for color in colors])
    
    # 寫入Markdown文件
    with open(os.path.join(output_dir, 'content.md'), 'w', encoding='utf-8') as f:
        f.write(''.join(md_content))
    
    # 分析主題色
    color_counter = Counter(all_colors)
    dominant_colors = color_counter.most_common(5)
    
    # 生成配色建議
    with open(os.path.join(output_dir, 'color_theme.md'), 'w', encoding='utf-8') as f:
        f.write('# 主題配色建議\n\n')
        f.write('## 主要顏色\n')
        for i, (color, count) in enumerate(dominant_colors, 1):
            hex_color = rgb_to_hex(color)
            f.write(f'{i}. {hex_color} (使用頻率: {count})\n')
        
        f.write('\n## UI/UX 建議\n')
        f.write('1. 主色調：使用最常見的顏色作為主要品牌色\n')
        f.write('2. 輔助色：使用第二和第三常見的顏色作為輔助色\n')
        f.write('3. 強調色：使用較少出現的鮮艷顏色作為強調色\n')
        f.write('4. 背景色：建議使用主色調的淺色版本作為背景\n')
        f.write('5. 文字色：根據背景色的明暗度選擇適當的文字顏色\n')
    
    return {
        'content_md': os.path.join(output_dir, 'content.md'),
        'color_theme_md': os.path.join(output_dir, 'color_theme.md'),
        'images_dir': images_dir,
        'dominant_colors': [{'hex': rgb_to_hex(color), 'count': count} for color, count in dominant_colors]
    }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': '沒有選擇文件'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': '沒有選擇文件'}), 400
    
    if not file.filename.endswith('.pptx'):
        return jsonify({'error': '只支持PPTX文件'}), 400
    
    # 檢查文件大小
    file_content = file.read()
    file_size_mb = len(file_content) / (1024 * 1024)
    if file_size_mb > MAX_FILE_SIZE_MB:
        return jsonify({'error': f'文件過大。最大允許大小為{MAX_FILE_SIZE_MB}MB，您的檔案為{file_size_mb:.1f}MB'}), 413
    
    # 重置文件指針以便後續處理
    file.seek(0)
    
    # 創建唯一的輸出目錄
    output_id = str(hash(file.filename + str(os.urandom(8))))[1:10]
    output_dir = os.path.join(app.config['OUTPUT_FOLDER'], output_id)
    os.makedirs(output_dir, exist_ok=True)
    
    # 保存上傳的文件
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    
    try:
        # 處理PPT文件
        result = process_ppt(file_path, output_dir)
        
        # 創建ZIP文件
        zip_path = os.path.join(app.config['OUTPUT_FOLDER'], f'{output_id}.zip')
        with zipfile.ZipFile(zip_path, 'w') as zipf:
            # 添加Markdown文件
            zipf.write(result['content_md'], os.path.basename(result['content_md']))
            zipf.write(result['color_theme_md'], os.path.basename(result['color_theme_md']))
            
            # 添加圖片
            for img_file in os.listdir(result['images_dir']):
                img_path = os.path.join(result['images_dir'], img_file)
                zipf.write(img_path, os.path.join('images', img_file))
        
        # 讀取Markdown內容用於預覽
        with open(result['content_md'], 'r', encoding='utf-8') as f:
            content_md = f.read()
        
        with open(result['color_theme_md'], 'r', encoding='utf-8') as f:
            color_theme_md = f.read()
        
        return jsonify({
            'success': True,
            'output_id': output_id,
            'content_md': content_md,
            'color_theme_md': color_theme_md,
            'dominant_colors': result['dominant_colors'],
            'original_filename': filename
        })
    
    except Exception as e:
        return jsonify({'error': f'處理文件時出錯: {str(e)}'}), 500
    finally:
        # 清理上傳的文件
        if os.path.exists(file_path):
            os.remove(file_path)

@app.route('/download/<output_id>')
def download_file(output_id):
    zip_path = os.path.join(app.config['OUTPUT_FOLDER'], f'{output_id}.zip')
    if not os.path.exists(zip_path):
        return jsonify({'error': '文件不存在或已過期'}), 404
    
    # 從請求中取得原始文件名
    filename = request.args.get('filename', 'extracted_content')
    # 添加byaslaninno後綴
    download_name = f"{filename}_byaslaninno.zip"
    
    return send_file(zip_path, as_attachment=True, download_name=download_name)

# 清理臨時文件的路由（可選）
@app.route('/cleanup/<output_id>', methods=['POST'])
def cleanup(output_id):
    output_dir = os.path.join(app.config['OUTPUT_FOLDER'], output_id)
    zip_path = os.path.join(app.config['OUTPUT_FOLDER'], f'{output_id}.zip')
    
    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
    
    if os.path.exists(zip_path):
        os.remove(zip_path)
    
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)