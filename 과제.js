// 1. 페이지 전환 (SPA 라우팅 및 페이드 애니메이션)
function navigate(pageId) {
    // 모든 페이지에서 active 클래스 제거 (숨김)
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    // 클릭한 페이지만 active 클래스 추가 (보여줌)
    document.getElementById(pageId).classList.add('active');
}

// 2. 페이지 내 동적 변화 (드라이버 아코디언 메뉴)
function toggleDriverDetails(cardElement) {
    cardElement.classList.toggle('open');
}

// 3. 데이터베이스 CRUD 기능 (Local Storage 활용)
let posts = JSON.parse(localStorage.getItem('f1_posts')) || [];

// Create (등록)
function addPost() {
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;

    if (!author || !content) {
        alert("이름과 내용을 모두 입력해주세요!");
        return;
    }

    const newPost = { id: Date.now(), author, content };
    posts.push(newPost);
    saveAndRender();

    // 입력창 초기화
    document.getElementById('author').value = '';
    document.getElementById('content').value = '';
}

// Read (조회 및 화면 그리기)
function renderPosts() {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';

    posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post-item';
        div.innerHTML = `
            <div>
                <strong>${post.author}</strong>: ${post.content}
            </div>
            <div class="post-actions">
                <button onclick="editPost(${post.id})">수정</button>
                <button onclick="deletePost(${post.id})">삭제</button>
            </div>
        `;
        postList.appendChild(div);
    });
}

// Update (수정)
function editPost(id) {
    const post = posts.find(p => p.id === id);
    const newContent = prompt("수정할 내용을 입력하세요:", post.content);
    
    if (newContent !== null && newContent.trim() !== "") {
        post.content = newContent;
        saveAndRender();
    }
}

// Delete (삭제)
function deletePost(id) {
    if(confirm("정말 삭제하시겠습니까?")) {
        posts = posts.filter(p => p.id !== id);
        saveAndRender();
    }
}

// 데이터 저장 및 화면 갱신
function saveAndRender() {
    localStorage.setItem('f1_posts', JSON.stringify(posts));
    renderPosts();
}

// 앱 실행 시 게시판 렌더링
renderPosts();