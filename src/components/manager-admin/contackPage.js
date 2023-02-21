import { deleteConnect, getConnect, postConnect, updateConnect } from "@/api/connect";

let connects = [];

// Form thêm mới + sửa
function form(data = {}, flag = false) {
    return `
    <li class="form-add list-group-item d-flex justify-content-between align-items-center p-3">
        <div class="  mb-4">
            <h5 class=" ">Lĩnh vực : <input class="  form-control" name="label" value="${data.label ?? ''}"></h5>
            <h5 class=" ">Đường dẫn : <input class="  form-control" name="data" value="${data.data ?? ''}"></h5>
            <input class="wk form-control" type="hidden" name="id" value="${data.id ?? ''}">
            <button data-key="${flag ? 'update' : 'store'}" class="save-cn btn btn-primary">Lưu</button>
            <button class="cancel-cn btn btn-danger" >Hủy</button>
        </div>
    </li>
`;
}
// Lấy dữ liệu
async function getW(flag = false) {
    if (flag == false) {
        const { data: res } = await getConnect();
        connects = res;
    }

    const htmlSkill = `` + connects.map((item, key) => /* html */ `
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                <div class="  mb-4">
                                    <h5 class=" ">Lĩnh vực : ${item.label}</h5>
                                    <h5 class=" ">Đường dẫn : ${item.data}</h5>
                                    <button data-key="${key}" class="edit-cn btn btn-primary">Sửa</button>
                                    <button data-key="${item.id}" class="delete-cn btn btn-danger" >Xóa</button>
                                </div>
                            </li>
                        
                        `).join("");
    return htmlSkill;
}

// Page
const getConnectAdmin = {
    async render() {
        return /* html */ `
                <h2>Mạng xã hội</h2> 
                <div class="card-body p-0">
                    <ul class="list-group l-work list-group-flush rounded-3">
                        <div class="list-cn">
                            ${await getW()} 
                        </div>
                        <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                            <div class="mb-0">
                                <button class="add-cn btn btn-primary" >Thêm mới kết nối</button>
                            </div>
                        </li>
                    </ul>
                </div>
            `;
    },
    jsInitScript() {

        $(".add-cn").on('click', async function () {
            [...document.getElementsByClassName("form-add")].map(n => n.remove());
            $('.list-cn').append(form());
        });

        $(document).on('click', '.edit-cn', async function () {
            await [...document.getElementsByClassName("form-add")].map(n => n.remove());
            await $('.list-cn').append(form(connects[$(this).data('key')], true));
        });

        $(document).on('click', '.delete-cn', async function () {
            [...document.getElementsByClassName("form-add")].map(n => n && n.remove());
            await deleteConnect($(this).data('key'));
            var html = await getW();
            $('.list-cn').html(html);
        });

        $(document).on('click', '.save-cn', async function () {
            const dataN = $(document.querySelector('input[name="data"]')).val();
            const label = $(document.querySelector('input[name="label"]')).val();
            if (dataN.trim() == "" || label.trim() == "") {
                alert('Nhap du lieu')
                return;
            }
            let data = {
                data: dataN,
                label: label,
            }
            if ($(this).data('key') == 'store') {
                await postConnect(data);
                var html = await getW();
                $('.list-cn').html(html);
            } else {
                const id = $(document.querySelector('input[name="id"]')).val();
                await updateConnect(id, data);
                var html = await getW();
                $('.list-cn').html(html);
            }
            [...document.getElementsByClassName("form-add")].map(n => n && n.remove());

        });

        $(document).on('click', '.cancel-cn', async function () {
            var html = await getW(true);
            $('.list-cn').html(html);
        })

    },
};

export default getConnectAdmin;