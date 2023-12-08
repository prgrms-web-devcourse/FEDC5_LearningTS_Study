export default class Header {
    constructor({ $app, title }) {
        this.$header = document.createElement('h1');
        this.$app = $app;
        this.title = title;
        this.render();
    }
    render() {
        this.$header.textContent = this.title;
        this.$app.appendChild(this.$header);
    }
}
