// 定义全局变量
const API_KEY = "【请输入您的API KEY】"; // API密钥
const API_URL = "https://api.siliconflow.cn/v1/chat/completions"; // API端点
const MODEL = "deepseek-ai/DeepSeek-R1"; // 使用的免费模型

// 在DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const contentInput = document.getElementById('content-input');
    const generateBtn = document.getElementById('generate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const loadingElement = document.getElementById('loading');
    const resultSection = document.getElementById('result-section');
    const mainTitleElement = document.getElementById('main-title');
    const subTitlesElement = document.getElementById('sub-titles');
    const copyBtn = document.getElementById('copy-btn');
    const saveBtn = document.getElementById('save-btn');

    // 点击"生成标题"按钮的事件处理
    generateBtn.addEventListener('click', async function() {
        const content = contentInput.value.trim();
        
        // 检查输入内容是否为空
        if (!content) {
            alert('请输入文章内容或主要观点!');
            return;
        }

        // 显示加载动画，隐藏结果区域
        loadingElement.style.display = 'flex';
        resultSection.style.display = 'none';

        try {
            // 调用API生成标题
            const result = await generateTitles(content);
            
            // 显示结果
            displayResults(result);
            
            // 隐藏加载动画，显示结果区域
            loadingElement.style.display = 'none';
            resultSection.style.display = 'block';
            
            // 滚动到结果区域
            resultSection.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            // 处理错误
            console.error('生成标题时出错:', error);
            alert('生成标题时出错: ' + error.message);
            loadingElement.style.display = 'none';
        }
    });

    // 点击"清空内容"按钮的事件处理
    clearBtn.addEventListener('click', function() {
        contentInput.value = '';
        resultSection.style.display = 'none';
        contentInput.focus();
    });

    // 点击"复制结果"按钮的事件处理
    copyBtn.addEventListener('click', function() {
        // 获取所有生成的结果内容
        const mainTitle = mainTitleElement.textContent;
        const subTitlesContent = Array.from(subTitlesElement.querySelectorAll('.subtitle-item'))
            .map(item => {
                const title = item.querySelector('h4').textContent;
                const description = item.querySelector('p').textContent;
                return `${title}\n${description}`;
            }).join('\n\n');
        
        // 组合内容
        const textToCopy = `${mainTitle}\n\n${subTitlesContent}`;
        
        // 复制到剪贴板
        navigator.clipboard.writeText(textToCopy)
            .then(() => alert('已复制到剪贴板!'))
            .catch(err => {
                console.error('复制失败:', err);
                alert('复制失败，请手动复制。');
            });
    });

    // 点击"保存为文档"按钮的事件处理
    saveBtn.addEventListener('click', function() {
        // 获取所有生成的结果内容
        const mainTitle = mainTitleElement.textContent;
        const subTitlesContent = Array.from(subTitlesElement.querySelectorAll('.subtitle-item'))
            .map(item => {
                const title = item.querySelector('h4').textContent;
                const description = item.querySelector('p').textContent;
                return `${title}\n${description}`;
            }).join('\n\n');
        
        // 组合内容
        const textToSave = `${mainTitle}\n\n${subTitlesContent}`;
        
        // 创建Blob对象
        const blob = new Blob([textToSave], { type: 'text/plain;charset=utf-8' });
        
        // 创建下载链接
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '报告标题结构.txt';
        document.body.appendChild(a);
        a.click();
        
        // 清理
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    });

    // 调用AI API生成标题的函数
    async function generateTitles(content) {
        // 构建API请求
        const requestBody = {
            model: "deepseek-ai/DeepSeek-R1",
            messages: [
                {
                    role: "system",
                    content: "你是一位专业的政务写作助手，帮助国企员工撰写高质量的报告标题。请根据用户提供的内容，生成一个专业的报告总标题，以及3-5个小标题。这些小标题应当符合申论高分作文的要求，接地气且有层次感，能够清晰展示递进的思路。请按照以下格式返回结果：\n\n总标题：[总标题文本]\n\n小标题1：[小标题1文本]\n小标题1解释：[对这个小标题的简短解释，以及与下一个小标题的关系]\n\n小标题2：[小标题2文本]\n小标题2解释：[对这个小标题的简短解释，以及与下一个小标题的关系]\n\n小标题3：[小标题3文本]\n小标题3解释：[对这个小标题的简短解释，以及与下一个小标题的关系]\n\n..."
                },
                {
                    role: "user",
                    content: content
                }
            ],
            max_tokens: 1000,
            temperature: 0.7,
            top_p: 0.8
        };

        // 发送API请求
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(requestBody)
        });

        // 检查响应状态
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API请求失败，状态码: ${response.status}`);
        }

        // 解析API响应
        const data = await response.json();
        return data.choices[0].message.content;
    }

    // 解析并显示API返回的结果
    function displayResults(resultText) {
        // 解析返回的文本
        const lines = resultText.split('\n').filter(line => line.trim());
        
        // 获取总标题
        let mainTitle = '';
        const mainTitleMatch = resultText.match(/总标题：(.+)/);
        if (mainTitleMatch && mainTitleMatch[1]) {
            mainTitle = mainTitleMatch[1].trim();
        }

        // 提取所有小标题和解释
        const subtitles = [];
        let currentSubtitle = null;

        for (const line of lines) {
            const subtitleMatch = line.match(/小标题(\d+)：(.+)/);
            const explanationMatch = line.match(/小标题\d+解释：(.+)/);

            if (subtitleMatch) {
                // 如果之前存储的小标题存在，则将其添加到结果数组中
                if (currentSubtitle) {
                    subtitles.push(currentSubtitle);
                }
                // 创建新的小标题对象
                currentSubtitle = {
                    title: subtitleMatch[2].trim(),
                    explanation: ''
                };
            } else if (explanationMatch && currentSubtitle) {
                // 为当前小标题添加解释
                currentSubtitle.explanation = explanationMatch[1].trim();
            }
        }

        // 添加最后一个小标题
        if (currentSubtitle) {
            subtitles.push(currentSubtitle);
        }

        // 显示总标题
        mainTitleElement.textContent = mainTitle;

        // 显示小标题
        subTitlesElement.innerHTML = '';
        subtitles.forEach((subtitle, index) => {
            const subtitleElement = document.createElement('div');
            subtitleElement.className = 'subtitle-item';

            const titleElement = document.createElement('h4');
            titleElement.textContent = subtitle.title;

            const explanationElement = document.createElement('p');
            explanationElement.textContent = subtitle.explanation;

            subtitleElement.appendChild(titleElement);
            subtitleElement.appendChild(explanationElement);
            subTitlesElement.appendChild(subtitleElement);

            // 如果不是最后一个小标题，添加箭头
            if (index < subtitles.length - 1) {
                const arrowElement = document.createElement('div');
                arrowElement.className = 'subtitle-arrow';
                arrowElement.innerHTML = '<i class="fas fa-arrow-down"></i>';
                subTitlesElement.appendChild(arrowElement);
            }
        });
    }
});
