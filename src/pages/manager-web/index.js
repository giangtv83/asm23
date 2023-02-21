import "slick-carousel";
import HomePage from "@/components/manager-web/homePage";
import WorkPage from "@/components/manager-web/workPage";
import AboutPage from "@/components/manager-web/aboutPage";
import ContactPage from "@/components/manager-web/contactPage";
import ProjectPage from "@/components/manager-web/projectPage";

const MyWeb = {
    getTitle() {
        return "TRAN VAN GIANG";
    },
    async render() {
        return /* html */ `
            <!-- notification for small viewports and landscape oriented smartphones -->
            <div class="device-notification">
            <a class="device-notification--logo" href="#0">
                <img src="assets/img/logo.png" alt="Global" />
                <p>Global</p>
            </a>
            <p class="device-notification--message">
                Global has so much to offer that we must request you orient your device to
                portrait or find a larger screen. You won't be disappointed.
            </p>
            </div>

            <div class="perspective effect-rotate-left">
            <div class="container">
                <div class="outer-nav--return  "></div>
                <div id="viewport" class="l-viewport">
                <div class="l-wrapper">
                    <header class="header">
                        <a class="header--logo" href="#0">
                            <img src="assets/img/logo.png" alt="Global" />
                            <p>V.Giang</p>
                            <a style="color:white" href="/#/admin">Admin</a>
                        </a>
                        
                    </header>
                    <nav style="" class="l-side-nav">
                    <ul class="side-nav">
                        <li class="is-active"><span>Home</span></li>
                        <li><span>Works</span></li>
                        <li><span>About</span></li>
                        <li><span>Contact</span></li>
                        <li><span>Hire us</span></li>
                    </ul>
                    </nav>
                    <ul class="l-main-content main-content  ">
                        ${await HomePage.render()} 
                        ${await WorkPage.render()} 
                        ${await AboutPage.render()} 
                        ${await ProjectPage.render()}
                        ${await ContactPage.render()} 
                    </ul>
                </div>
                </div>
            </div>
            
            </div>

            `;
    },
    jsInitScript() { },
};
export default MyWeb;