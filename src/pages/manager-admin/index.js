import { postPortFolio, getPortfolio } from "@/api/portfolio";
import getConnectAdmin from "@/components/manager-admin/contackPage";
import getProjectAdmin from "@/components/manager-admin/projectPage";
import getSkillAdmin from "@/components/manager-admin/skillPage";
import getWorkAdmin from "@/components/manager-admin/workPage";
import { useEffect } from "@/lib";
import { uploadFile } from "@/utils";

let data = {
    name: '',
    image: '',
    cv_link: '',
    github_link: '',
    level: '',
    email: '',
    bd: '',
    phone: '',
    address: '',
    detail: ''
};

async function getP() {
    const { data: res } = await getPortfolio();
    data = res;
    return res;
}

const MyDas = {
    getTitle() {
        return "TRAN VAN GIANG";
    },
    async render() {
        await getP();
        return /* html */ `
            <style>body {background : white ; color : black}</style>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand btn btn-primary text-white" href="/#/">Client</a>
                </div>
            </nav>

            <section style="background-color: #eee;">
                <div class="  py-5">

                    <div class="row">
                        <div class="col-lg-4">
                           
                            <div class="card mb-4">
                                <div class="card-body text-center">
                                    <label for="file">
                                            <img id="img-show" src="${data.image}" alt="avatar"
                                        class="rounded-circle img-fluid" style="width: 150px;">
                                    </label>
                                    <input id="file" style="display:none" type="file" name="image">
                                    <h5 class="my-3 name-show">${data.name}</h5>
                                    <p class="text-muted mb-1 email-show">${data.email}</p>
                                    <div class="d-flex justify-content-center mb-2">
                                        <button type="button" class="btn btn-outline-primary ms-1">Fpoly dev</button>
                                    </div>
                                </div>
                            </div>
                            <div class="card p-2 mb-4 mb-lg-0">
                                 ${await getWorkAdmin.render()}
                            </div>
                            <div class="card p-2 mb-4 mb-lg-0">
                                ${await getSkillAdmin.render()}
                            </div>
                            <div class="card p-2 mb-4 mb-lg-0">
                                ${await getConnectAdmin.render()}
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div class="p-2 card mb-4">
                                <h2>Cá nhân </h2>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <p class="mb-0">Họ và tên</p>
                                        </div>
                                        <div class="col-sm-9">
                                            <input class="form-control" type="text" name="name" value="${data.name}">
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <p class="mb-0">Email </p>
                                        </div>
                                        <div class="col-sm-9">
                                            <input class="form-control" type="email" name="email" value="${data.email}">
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <p class="mb-0">Số điện thoại</p>
                                        </div>
                                        <div class="col-sm-9">
                                            <input class="form-control" type="text" name="phone" value="${data.phone}">
                                        </div>
                                    </div> 
                                    <hr>
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <p class="mb-0">Địa chỉ</p>
                                        </div>
                                        <div class="col-sm-9">
                                            <input class="form-control" type="text" name="address" value="${data.address}">
                                        </div> 
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <p class="mb-0">Trình độ </p>
                                        </div>
                                        <div class="col-sm-9">
                                            <input class="form-control" type="text" name="level" value="${data.level}"> 
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <p class="mb-0">Github</p>
                                        </div>
                                        <div class="col-sm-9">
                                            <input class="form-control" type="text" name="github_link" value="${data.github_link}"> 
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <p class="mb-0">CV cá nhân </p>
                                        </div>
                                        <div class="col-sm-9">
                                            <input class="form-control" type="text" name="cv_link" value="${data.cv_link}"> 
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <p class="mb-0">Tiểu sử </p>
                                        </div>
                                        <div class="col-sm-9">
                                            <textarea class="form-control textarea" name="detail">${data.detail}</textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row "> 
                                ${await getProjectAdmin.render()} 
                            </div>
                        </div>
                    </div>
                </div>
                </section>
            `;
    },
    jsInitScript() {

        getWorkAdmin.jsInitScript();
        getSkillAdmin.jsInitScript();
        getProjectAdmin.jsInitScript();
        getConnectAdmin.jsInitScript();

        $("input").on("change", function () {
            let attr = this.getAttribute('name');
            let val = this.value;
            data[attr] = val;
            $('.name-show').html(data.name);
            $('.email-show').html(data.email);
            postPortFolio(data).then(() => { });
        });

        $('#file').on('change', function () {
            uploadFile($(this)[0].files[0]).then(res => {
                data['image'] = res.data.secure_url;
                $('#img-show').attr("src", data['image']);
                postPortFolio(data).then(() => { });
            });
        })

    },
};
export default MyDas;