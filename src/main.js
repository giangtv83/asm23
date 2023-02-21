import Navigo from "navigo";
import "slick-carousel/slick/slick.css";
import MyWeb from "@/pages/manager-web";
import MyDas from "@/pages/manager-admin";

const router = new Navigo("/", { linksSelector: "a", hash: true });

const print = async(content, id, pageNumber) => {
    document.querySelector("#app").innerHTML = await content.render(id, pageNumber);

    if (content.jsInitScript) content.jsInitScript(id);

    if (content.getTitle) document.title = await content.getTitle(id);
};


router.on({
    "/": () => {
        print(MyWeb);
    },
    "/admin": () => {
        print(MyDas);
    }
});

router.notFound(() => {
    print(`PAGE NOT FOUND`);
});

router.resolve();