const filterInput = document.querySelector("input"),
  postsContainer = document.querySelector(".posts-container"),
  loader = document.querySelector(".loader");

let limit = 3,
  page = 1;

async function getPosts() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  return response.json();
}

async function showPosts() {
  const posts = await getPosts();
  posts.map((post) => {
    const sectionEl = document.createElement("article");
    sectionEl.classList.add("post");
    sectionEl.innerHTML = `
        <h5 class="post-num">${post.id}</h5>
        <div class="post-info">
          <h3 class="post-title">${post.title}</h3>
          <p class="post-body">
            ${post.body}
          </p>
        </div>
    `;
    postsContainer.appendChild(sectionEl);
  });
}
showPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 2) {
    loader.classList.add("show");
    setTimeout(() => {
      loader.classList.remove("show");
      setTimeout(() => {
        page++;
        showPosts();
      }, 300);
    }, 1000);
  }
});

filterInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toLowerCase();
    const body = post.querySelector(".post-body").innerText.toLowerCase();
    if (title.includes(term) || body.includes(term)) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
});
