document.addEventListener('DOMContentLoaded', function() {
    // Elements
    // const chatViewBtn = document.getElementById('chatViewBtn'); // Removed as per diff
    // const paramsViewBtn = document.getElementById('paramsViewBtn'); // Removed as per diff
    // const chatView = document.getElementById('chatView'); // Removed as per diff
    // const paramsView = document.getElementById('paramsView'); // Removed as per diff
    const rawPromptBtn = document.getElementById('rawPromptBtn');
    const fineTunePromptBtn = document.getElementById('fineTunePromptBtn');
    const rawPromptSection = document.getElementById('rawPromptSection');
    const fineTunePromptSection = document.getElementById('fineTunePromptSection');
    const rawPrompt = document.getElementById('rawPrompt');
    const fineTunePrompt = document.getElementById('fineTunePrompt');
    const pythonCode = document.getElementById('pythonCode');

    // New Elements (Added as per diff)
    const codeViewBtn = document.getElementById('codeViewBtn');
    const traceViewBtn = document.getElementById('traceViewBtn');
    const bgInfoViewBtn = document.getElementById('bgInfoViewBtn');
    const codeView = document.getElementById('codeView');
    const traceView = document.getElementById('traceView');
    const bgInfoView = document.getElementById('bgInfoView');
    const userInput = document.getElementById('userInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const addParamBtn = document.getElementById('addParamBtn');
    const addParamForm = document.getElementById('addParamForm');
    const confirmAddParam = document.getElementById('confirmAddParam');
    const cancelAddParam = document.getElementById('cancelAddParam');
    const backgroundInfo = document.getElementById('backgroundInfo');

    const saveButton = document.getElementById('saveButton');
    const cmdModal = document.getElementById('cmdModal');
    const closeBtn = document.querySelector('.close');
    const cmdOutput = document.getElementById('cmdOutput');

    // Store textareas content
    let promptData = {
        raw: '',
        fineTune: ''
    };

    // Background info data (Added as per diff)
    let bgInfoData = [
        { key: '問題類型', value: '斐波那契數列計算' },
        { key: '使用場景', value: '數學函數實作' }
    ];

    // Test Data for Demo
    const demoChat = [
        { sender: 'user', content: '你好，我需要一個函數來計算斐波那契數列。' },
        { sender: 'bot', content: '當然，我可以幫你寫一個計算斐波那契數列的函數。' },
        { sender: 'user', content: '請讓它能夠處理大數字，避免遞歸方式的效能問題。' },
        { sender: 'bot', content: '明白了，我會使用迭代方式來實現，這樣可以處理較大的數字且不會有堆疊溢出的問題。' }
    ];

    const demoTraceList = [
        '追蹤項目 1: 初始化對話',
        '追蹤項目 2: 使用者請求斐波那契函數',
        '追蹤項目 3: LLM 回應生成中',
        '追蹤項目 4: Python 代碼生成完成'
    ];

    // demoFileList removed as per diff

    const demoPythonCode = `def fibonacci(n):
    """
    計算斐波那契數列的第 n 個數字
    使用迭代方式避免遞歸的效能問題

    參數:
        n (int): 需要計算的斐波那契數列位置

    返回:
        int: 斐波那契數列的第 n 個數字
    """
    if n <= 0:
        return 0
    elif n == 1:
        return 1

    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b

    return b

# 測試函數
if __name__ == "__main__":
    for i in range(10):
        print(f"fibonacci({i}) = {fibonacci(i)}")

    # 測試較大的數字
    print(f"fibonacci(100) = {fibonacci(100)}")`;

    // Load Demo Data
    function loadDemoData() {
        // Load chat messages
        const chatMessages = document.getElementById('chatMessages');
        demoChat.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.sender}`;

            const headerDiv = document.createElement('div');
            headerDiv.className = 'message-header';
            headerDiv.textContent = msg.sender === 'user' ? '使用者' : 'AI 助手';

            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.textContent = msg.content;

            messageDiv.appendChild(headerDiv);
            messageDiv.appendChild(contentDiv);
            chatMessages.appendChild(messageDiv);
        });

        // Load trace list
        const traceList = document.getElementById('traceList');
        demoTraceList.forEach(trace => {
            const traceItem = document.createElement('div');
            traceItem.className = 'trace-item';
            traceItem.textContent = trace;
            traceList.appendChild(traceItem);
        });

        // Load file list section removed as per diff
        // Load background info (Added as per diff)
        renderBackgroundInfo();

        // Set initial code content
        pythonCode.textContent = demoPythonCode;
        highlightCode();
    }

    // Render Background Info (Added as per diff)
    function renderBackgroundInfo() {
        backgroundInfo.innerHTML = '';
        bgInfoData.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span><strong>${item.key}:</strong> ${item.value}</span>
                <span>
                    <button class="delete-param" data-index="${index}">
                        <i class="fas fa-times"></i>
                    </button>
                </span>
            `;
            backgroundInfo.appendChild(li);
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-param').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                bgInfoData.splice(index, 1);
                renderBackgroundInfo();
            });
        });
    }

    // Initialize Highlighting
    function highlightCode() {
        hljs.highlightElement(pythonCode);
    }

    // View Toggle for Left Panel removed as per diff
    // View Toggle for Info Sections (Added as per diff)
    codeViewBtn.addEventListener('click', function() {
        codeViewBtn.classList.add('active');
        traceViewBtn.classList.remove('active');
        bgInfoViewBtn.classList.remove('active');
        codeView.classList.add('active');
        traceView.classList.remove('active');
        bgInfoView.classList.remove('active');
    });

    traceViewBtn.addEventListener('click', function() {
        traceViewBtn.classList.add('active');
        codeViewBtn.classList.remove('active');
        bgInfoViewBtn.classList.remove('active');
        traceView.classList.add('active');
        codeView.classList.remove('active');
        bgInfoView.classList.remove('active');
    });

    bgInfoViewBtn.addEventListener('click', function() {
        bgInfoViewBtn.classList.add('active');
        codeViewBtn.classList.remove('active');
        traceViewBtn.classList.remove('active');
        bgInfoView.classList.add('active');
        codeView.classList.remove('active');
        traceView.classList.remove('active');
    });

    // Prompt Type Toggle for Right Panel
    rawPromptBtn.addEventListener('click', function() {
        // Save current fine tune prompt value
        promptData.fineTune = fineTunePrompt.value;

        rawPromptBtn.classList.add('active');
        fineTunePromptBtn.classList.remove('active');
        rawPromptSection.classList.add('active');
        fineTunePromptSection.classList.remove('active');

        // Restore saved raw prompt value
        rawPrompt.value = promptData.raw;
    });

    fineTunePromptBtn.addEventListener('click', function() {
        // Save current raw prompt value
        promptData.raw = rawPrompt.value;

        fineTunePromptBtn.classList.add('active');
        rawPromptBtn.classList.remove('active');
        fineTunePromptSection.classList.add('active');
        rawPromptSection.classList.remove('active');

        // Restore saved fine tune prompt value
        fineTunePrompt.value = promptData.fineTune;
    });

    // Chat message handling (Added as per diff)
    sendMessageBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    function adjustTextareaHeight(textarea) {
        // 重置高度以獲取真實內容高度
        textarea.style.height = 'auto';
        
        // 計算當前內容行數
        const lineHeight = 20; // 估計平均行高
        const currentLines = Math.floor(textarea.scrollHeight / lineHeight);
        
        // 設定最大行數限制
        const maxLines = 6;
        const newLines = Math.min(Math.max(1, currentLines), maxLines);
        
        // 設定新高度 (每行20px + 上下padding各10px)
        const newHeight = (newLines * lineHeight) + 20;
        textarea.style.height = newHeight + 'px';
        
        // 如果內容超過最大行數，啟用滾動條
        textarea.style.overflowY = currentLines > maxLines ? 'auto' : 'hidden';
    }
    
    // 初始化時執行一次
    adjustTextareaHeight(userInput);
    
    // 當輸入內容時重新調整高度
    userInput.addEventListener('input', function() {
        adjustTextareaHeight(this);
    });
    


    function sendMessage() {
        const message = userInput.value.trim();
        const originalHeight = userInput.style.height;
        if (message) {
            // Add user message to chat
            addChatMessage('user', message);
            userInput.value = '';

            // Simulate bot response
            setTimeout(() => {
                addChatMessage('bot', '收到您的訊息，我們會盡快處理。');
                userInput.style.height = 'auto';
                adjustTextareaHeight(userInput);
            }, 1000);
        }
    }

    function addChatMessage(sender, content) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const headerDiv = document.createElement('div');
        headerDiv.className = 'message-header';
        headerDiv.textContent = sender === 'user' ? '使用者' : 'AI 助手';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;

        messageDiv.appendChild(headerDiv);
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Background Info Parameter Management (Added as per diff)
    addParamBtn.addEventListener('click', function() {
        addParamForm.style.display = 'flex';
    });

    confirmAddParam.addEventListener('click', function() {
        const key = document.getElementById('paramKey').value.trim();
        const value = document.getElementById('paramValue').value.trim();

        if (key && value) {
            bgInfoData.push({ key, value });
            renderBackgroundInfo();

            // Reset and hide form
            document.getElementById('paramKey').value = '';
            document.getElementById('paramValue').value = '';
            addParamForm.style.display = 'none';
        }
    });

    cancelAddParam.addEventListener('click', function() {
        document.getElementById('paramKey').value = '';
        document.getElementById('paramValue').value = '';
        addParamForm.style.display = 'none';
    });

    // Save prompt values when input changes
    rawPrompt.addEventListener('input', function() {
        promptData.raw = rawPrompt.value;
    });

    fineTunePrompt.addEventListener('input', function() {
        promptData.fineTune = fineTunePrompt.value;
    });

    // Save Button Click Event
    saveButton.addEventListener('click', function() {
        // Gather all data to save
        const dataToSave = {
            rawPrompt: promptData.raw,
            fineTunePrompt: promptData.fineTune,
            backgroundInfo: bgInfoData, // Added as per diff
            pythonCode: pythonCode.textContent
        };

        // Show CMD modal
        showCmdModal();

        // Call backend save function
        // saveToBackend(dataToSave); // Assuming this function exists or will be implemented
        console.log("Data to save:", dataToSave); // Placeholder for actual save
    });

    // Modal Close Button
    closeBtn.addEventListener('click', function() {
        cmdModal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target == cmdModal) {
            cmdModal.style.display = 'none';
        }
    });

    // Show CMD Modal
    function showCmdModal() {
        cmdModal.style.display = 'block';
        cmdOutput.innerHTML = '> 正在初始化儲存操作...<br>';

        setTimeout(() => {
            cmdOutput.innerHTML += '> 驗證資料結構...<br>';
        }, 500);

        setTimeout(() => {
            cmdOutput.innerHTML += '> 準備連接資料庫...<br>';
            cmdOutput.innerHTML += '> 模擬儲存完成。<br>'; // Added simulation feedback
            // In a real scenario, you'd update based on saveToBackend result
        }, 1000);
    }

    // Initialize
    loadDemoData();
});