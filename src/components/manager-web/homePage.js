import { getPortfolio } from "@/api/portfolio";

const HomePage = {
    async render() {
        const { data: portfolio } = await getPortfolio();
        return /* html */ `
            <li class="l-section section section--is-active">
                <div class="intro">
                    <div class="intro--banner">
                        <h1>${portfolio.name}</h1>
                        <p>Trình độ : ${portfolio.level}</p>
                        <p style="max-width: 300px">Tiểu sử : ${portfolio.detail}</p>
                        <br>
                        <a style="color: white ; font-size : 15px " href="${portfolio.cv_link}" class="cta">Link CV
                        </a>
                        <img src="assets/img/introduction-visual.png" alt="Welcome">
                        <br>
                        <br>
                        <br>
                        <small>Email : ${portfolio.email}</small>
                        |
                        <small>Phone : ${portfolio.phone}</small>
                        |
                        <small>Address : ${portfolio.address}</small> 
                        <br>
                        <small>Github : <a href="${portfolio.github_link}">Github</a></small>
                    </div>
                </div>
            </li>
        `;
    },
    jsInitScript() { },
};

export default HomePage;