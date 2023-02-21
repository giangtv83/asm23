import { deleteProject, getProject, postProject, updateProject } from "@/api/project";

let projects = [];

// Form thêm mới + sửa
function form(data = {}, flag = false) {
    return `
    <div class=" col-md-6">
        <div class="card mb-4 mb-md-0">
            <div class="card-body">
                <h5 class=" ">Dự án : <input class="wk form-control" name="title" value="${data.title ?? ''}"></h5>
                <h5 class=" ">Dự án chi tiết : <input class="wk form-control" name="detail" value="${data.detail ?? ''}"></h5>
                <h5 class=" ">Dự án size : <input class="wk form-control" type="number" name="size" value="${data.size ?? ''}"></h5>
                <h5 class=" ">Dự án vị trí : <input class="wk form-control"   name="position" value="${data.position ?? ''}"></h5>
                <h5 class=" ">Dự án công nghệ : <input class="wk form-control"   name="technologies" value="${data.technologies ?? ''}"></h5>
                <h5 class=" ">Dự án github (link) : <input class="wk form-control"   name="github_link_pr" value="${data.github_link ?? ''}"></h5>
                <h5 class=" ">Dự án demo (link): <input class="wk form-control"   name="demo_link_pr" value="${data.demo_link ?? ''}"></h5>
                <input class="wk form-control" type="hidden" name="id" value="${data.id ?? ''}">

                <button data-key="${flag ? 'update' : 'store'}" class="save-pr btn btn-primary">Lưu</button>
                <button class="cancel-pr btn btn-danger" >Hủy</button>
            </div>
        </div>
    </div>
`;
}
// Lấy dữ liệu
async function getW(flag = false) {
    if (flag == false) {
        const { data: res } = await getProject();
        projects = res;
    }

    const htmlWork = `` + projects.map((item, key) => /* html */ `
                            <div class=" col-md-6">
                                <div class="card mb-4 mb-md-0">
                                    <div class="card-body">
                                        <p class="mb-4"><span class="text-primary font-italic me-1">Dự án</span> ${item.title}
                                        </p>
                                        <p class="mb-1" style="font-size: .77rem;">Chi tiết : ${item.detail}</p>
                                         
                                        <p class="mt-4 mb-1" style="font-size: .77rem;">Size : ${item.size}</p>
                                         
                                        <p class="mt-4 mb-1" style="font-size: .77rem;">Vị trí : ${item.position}</p>
                                        
                                        <p class="mt-4 mb-1" style="font-size: .77rem;">Công nghệ :  ${item.technologies}</p>
                                         
                                        <p class="mt-4 mb-1" style="font-size: .77rem;">Github : ${item.github_link}</p>
                                        <p class="mt-4 mb-1" style="font-size: .77rem;">Demo : ${item.demo_link}</p>
                                        <button data-key="${key}" class="edit-pr btn btn-primary">Sửa</button>
                                        <button data-key="${item.id}" class="delete-pr btn btn-danger" >Xóa</button>
                                    </div>
                                </div>
                            </div>
                        
                        `).join("");
    return htmlWork;
}
//Page
const getProjectAdmin = {
    async render() {
        return /* html */ `
                <h2>Dự án </h2>
                <div class="card-body p-0">
                    <ul class="list-group l-work list-group-flush rounded-3">
                        <div class="list-pr row">
                            ${await getW()} 
                            
                        </div>
                            <button class="mt-2 add-pr btn btn-primary" >Thêm mới dự án </button>
                        
                    </ul>
                </div>
            `;
    },
    jsInitScript() {

        $(".add-pr").on('click', async function () {
            [...document.getElementsByClassName("form-add")].map(n => n.remove());
            $('.list-pr').append(form());
        });

        $(document).on('click', '.edit-pr', async function () {
            await [...document.getElementsByClassName("form-add")].map(n => n.remove());
            await $('.list-pr').append(form(projects[$(this).data('key')], true));
        });

        $(document).on('click', '.delete-pr', async function () {
            [...document.getElementsByClassName("form-add")].map(n => n && n.remove());
            await deleteProject($(this).data('key'));
            var html = await getW();
            $('.list-pr').html(html);
        });

        $(document).on('click', '.save-pr', async function () {
            const title = $(document.querySelector('input[name="title"]')).val();
            const size = $(document.querySelector('input[name="size"]')).val();
            const detail = $(document.querySelector('input[name="detail"]')).val();
            const position = $(document.querySelector('input[name="position"]')).val();
            const technologies = $(document.querySelector('input[name="technologies"]')).val();
            const github_link = $(document.querySelector('input[name="github_link_pr"]')).val();
            const demo_link = $(document.querySelector('input[name="demo_link_pr"]')).val();

            let data = {
                title: title,
                size: size,
                detail: detail,
                position: position,
                technologies: technologies,
                github_link: github_link,
                demo_link: demo_link,
            }

            if ($(this).data('key') == 'store') {
                await postProject(data);
                var html = await getW();
                $('.list-pr').html(html); //cập nhật lại list
            } else {
                const id = $(document.querySelector('input[name="id"]')).val();
                await updateProject(id, data);
                var html = await getW();
                $('.list-pr').html(html);
            }
            [...document.getElementsByClassName("form-add")].map(n => n && n.remove());

        });

        $(document).on('click', '.cancel-pr', async function () {
            var html = await getW(true);
            $('.list-pr').html(html);
        })

    },
};

export default getProjectAdmin;