class Post {
    constructor (id) {
        this.url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        this.commentUrl = `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    }

    async getData(url) {
        let response = await fetch(url);
        if (response.ok) {
            return response.json()
        } else {
            console.error('Помилка HTTP: ' + response.status);
        }
    }

    async getPost() {
        return this.getData(this.url);
    }

    async getPostComments() {
        return this.getData(this.commentUrl);
    }

    async renderList() {
        let post = await this.getPost()
        const comments = await this.getPostComments();
        this.render(post, comments);
    }

    render(post, comments) {
        const title = document.getElementById('title');
        title.innerHTML = post.title;

        const description = document.getElementById('description');
        description.innerHTML = post.body;

        let divs = '';
        for (let el of comments) {
                if (!el) {
                return;
            }
            divs += `<div>
                Comment ${el.id}
                <div>Name: ${el.name}</div>
                <div>Email: ${el.email}</div>
                <div>${el.body}</div>
            </div>`;
        }
        const list = document.getElementById('comments');
        list.innerHTML = divs;
    }
}

new Post ('1').renderList();

console.log(1);
 
setTimeout(function () {
    console.log(2);
}, 100);
 
setTimeout(function () {
    console.log(3);
}, 0);
 
new Promise(function (resolve) {
    setTimeout(() => resolve(), 0);
}).then(() => {
    console.log(4);
});
 
console.log(5);
