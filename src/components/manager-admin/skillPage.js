import { deleteSkill, getSkill, postSkill, updateSkill } from "@/api/skill";

let skills = [];

//Form thêm mới chỉnh sửa
function form(data = {}, flag = false) {
    return `
    <li class="form-add list-group-item d-flex justify-content-between align-items-center p-3">
        <div class="  mb-4">
            <h5 class=" ">Tên kỹ năng : <input class="  form-control" name="name" value="${data.name ?? ''}"></h5>
            <input class="wk form-control" type="hidden" name="id" value="${data.id ?? ''}">
            <button data-key="${flag ? 'update' : 'store'}" class="save-sk btn btn-primary">Lưu</button>
            <button class="cancel-sk btn btn-danger" >Hủy</button>
        </div>
    </li>
`;
}
// Lấy dữ liệu
async function getW(flag = false) {
    if (flag == false) {
        const { data: res } = await getSkill();
        skills = res;
    }

    const htmlSkill = skills.map((item, key) => /* html */ `
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                <div class="  mb-4">
                                    <h5 class=" ">Tên kỹ năng : ${item.name}</h5>
                                    <button data-key="${key}" class="edit-sk btn btn-primary">Sửa</button>
                                    <button data-key="${item.id}" class="delete-sk btn btn-danger" >Xóa</button>
                                </div>
                            </li>
                        
                        `).join("");
    return htmlSkill;
}
// Page
const getSkillAdmin = {
    async render() {
        return /* html */ `
                <h2>Kỹ năng</h2> 
                <div class="card-body p-0">
                    <ul class="list-group l-work list-group-flush rounded-3">
                        <div class="list-sk">
                            ${await getW()} 
                        </div>
                        <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                            <div class="mb-0">
                                <button class="add-sk btn btn-primary" >Thêm mới kỹ năng</button>
                            </div>
                        </li>
                    </ul>
                </div>
            `;
    },
    jsInitScript() {

        $(".add-sk").on('click', async function () {
            [...document.getElementsByClassName("form-add")].map(n => n.remove());
            $('.list-sk').append(form());
        });


        $(document).on('click', '.edit-sk', async function () {
            await [...document.getElementsByClassName("form-add")].map(n => n.remove());
            await $('.list-sk').append(form(skills[$(this).data('key')], true));
        });

        $(document).on('click', '.delete-sk', async function () {
            [...document.getElementsByClassName("form-add")].map(n => n && n.remove());
            await deleteSkill($(this).data('key'));
            var html = await getW();
            $('.list-sk').html(html);
        });

        $(document).on('click', '.save-sk', async function () {
            const name = $(document.querySelector('input[name="name"]')).val();
            let data = {
                name: name,
            }
            if ($(this).data('key') == 'store') {
                await postSkill(data);
                var html = await getW();
                $('.list-sk').html(html);
            } else {
                const id = $(document.querySelector('input[name="id"]')).val();
                await updateSkill(id, data);
                var html = await getW();
                $('.list-sk').html(html);
            }
            [...document.getElementsByClassName("form-add")].map(n => n && n.remove());

        });

        $(document).on('click', '.cancel-sk', async function () {
            var html = await getW(true);
            $('.list-sk').html(html);
        })

    },
};

export default getSkillAdmin;