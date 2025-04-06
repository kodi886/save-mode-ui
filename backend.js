/**
 * Backend Interaction Functions
 * This file contains all functions that interact with the backend server.
 */

// Save data to backend database
function saveToBackend(data) {
    const cmdOutput = document.getElementById('cmdOutput');
    
    // Simulate backend communication
    setTimeout(() => {
        cmdOutput.innerHTML += '> 連接資料庫成功...<br>';
    }, 1500);
    
    setTimeout(() => {
        cmdOutput.innerHTML += '> 開始儲存資料...<br>';
    }, 2000);
    
    // Simulate API call to backend
    setTimeout(() => {
        // In a real application, this would be an actual fetch call
        // fetch('/api/save-conversation', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        
        // For demo, simulate success response
        const success = Math.random() > 0.1; // 90% success rate for demo
        
        if (success) {
            cmdOutput.innerHTML += '> 資料儲存成功!<br>';
            cmdOutput.innerHTML += `> 已儲存 ${data.pythonCode.split('\n').length} 行 Python 代碼<br>`;
            cmdOutput.innerHTML += '> 對話紀錄已保存到資料庫<br>';
            cmdOutput.innerHTML += '> 操作完成<br>';
            
            // In real application, you might want to clear the form or redirect
            // clearForm();
        } else {
            cmdOutput.innerHTML += '> 錯誤: 儲存過程中發生問題<br>';
            cmdOutput.innerHTML += '> 嘗試重新連接...<br>';
            
            setTimeout(() => {
                cmdOutput.innerHTML += '> 重新連接成功!<br>';
                cmdOutput.innerHTML += '> 資料儲存成功!<br>';
                cmdOutput.innerHTML += '> 操作完成<br>';
            }, 1500);
        }
    }, 3000);
}

// Load chat history from backend
function loadChatHistory() {
    // In a real application, this would fetch data from the backend
    // fetch('/api/get-chat-history')
    //     .then(response => response.json())
    //     .then(data => {
    //         displayChatHistory(data);
    //     })
    //     .catch(error => {
    //         console.error('Error loading chat history:', error);
    //     });
}

// Load parameters (trace list and file list) from backend
function loadParameters() {
    // In a real application, this would fetch data from the backend
    // fetch('/api/get-parameters')
    //     .then(response => response.json())
    //     .then(data => {
    //         displayParameters(data);
    //     })
    //     .catch(error => {
    //         console.error('Error loading parameters:', error);
    //     });
}

// Load generated Python code from backend
function loadPythonCode() {
    // In a real application, this would fetch data from the backend
    // fetch('/api/get-python-code')
    //     .then(response => response.json())
    //     .then(data => {
    //         displayPythonCode(data.code);
    //     })
    //     .catch(error => {
    //         console.error('Error loading Python code:', error);
    //     });
}

// Update chat history in real-time (could be used with WebSockets)
function setupRealtimeUpdates() {
    // In a real application, you might use WebSockets
    // const socket = new WebSocket('ws://your-backend/chat');
    // 
    // socket.onmessage = function(event) {
    //     const message = JSON.parse(event.data);
    //     appendChatMessage(message);
    // };
    // 
    // socket.onerror = function(error) {
    //     console.error('WebSocket error:', error);
    // };
}

// Clear form after successful save
function clearForm() {
    document.getElementById('rawPrompt').value = '';
    document.getElementById('fineTunePrompt').value = '';
    // Reset stored values
    promptData = {
        raw: '',
        fineTune: ''
    };
}
