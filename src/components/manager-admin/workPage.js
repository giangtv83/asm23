import { deleteWork, getWork, postWork, updateWork } from "@/api/work";

let works = [];

// Dữ liệu form thêm và sửa
function form(data = {}, flag = false) {
    return `
    <li class="form-add list-group-item d-flex justify-content-between align-items-center p-3">
        <div class="  mb-4">
            <h5 class=" ">Công ty  : <input class="wk form-control" name="company_name" value="${data.company_name ?? ''}"></h5>
            <p class="">Thời gian bắt đầu  :  <input class="wk form-control" type="date" name="start_time" value="${data.start_time ?? ''}"> </strong> </p>
            <p class="">Thời gian kết thúc  :  <input class="wk form-control" type="date" name="end_time" value="${data.end_time ?? ''}"> </strong> </p>
            <p class="">Trình độ :   <input class="wk form-control" name="level" value="${data.level ?? ''}"> </strong> </p>
            <p class="">Khác :  <input class="wk form-control" name="orther" value="${data.orther ?? ''}"> </p>
            <input class="wk form-control" type="hidden" name="id" value="${data.id ?? ''}">
            <button data-key="${flag ? 'update' : 'store'}" class="save btn btn-primary">Lưu</button>
            <button class="cancel btn btn-danger" >Hủy</button>
        </div>
    </li>
`;
}

// Lấy dữ liệu
async function getW(flag = false) {
    if (flag == false) {
        const { data: res } = await getWork();
        works = res;
    }

    const htmlWork = `` + works.map((item, key) => /* html */ `
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                <div class="  mb-4">
                                    <h5 class=" ">Công ty : ${item.company_name} : ${item.start_time} - ${item.end_time}</h5>
                                    <p class="">Trình độ  : ${item.level} </strong> </p>
                                    <p class="">Khác : ${item.orther} </p>
                                    <button data-key="${key}" class="edit btn btn-primary">Sửa</button>
                                    <button data-key="${item.id}" class="delete btn btn-danger" >Xóa</button>
                                </div>
                            </li>
                        
                        `).join("");
    return htmlWork;
}

const getWorkAdmin = {
    async render() {
        return /* html */ `
                <h2>Kinh nghiệm</h2> 
                <div class="card-body p-0">
                    <ul class="list-group l-work list-group-flush rounded-3">
                        <div class="list-wk">
                            ${await getW()} 
                        </div>
                        <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                            <div class="mb-0">
                                <button class="add btn btn-primary" >Thêm mới kinh nghiệm</button>
                            </div>
                        </li>
                    </ul>
                </div>
            `;
    },
    jsInitScript() {

        $(".add").on('click', async function () {
            [...document.getElementsByClassName("form-add")].map(n => n.remove());
            $('.list-wk').append(form());
        });

        $(document).on('click', '.edit', async function () {
            await [...document.getElementsByClassName("form-add")].map(n => n.remove());
            await $('.list-wk').append(form(works[$(this).data('key')], true));
        });

        $(document).on('click', '.delete', async function () {
            [...document.getElementsByClassName("form-add")].map(n => n && n.remove());
            await deleteWork($(this).data('key'));
            var html = await getW();
            $('.list-wk').html(html);
        });

        $(document).on('click', '.save', async function () {
            const company_name = $(document.querySelector('input[name="company_name"]')).val();
            const start_time = $(document.querySelector('input[name="start_time"]')).val();
            const end_time = $(document.querySelector('input[name="end_time"]')).val();
            const level = $(document.querySelector('input[name="level"]')).val();
            const orther = $(document.querySelector('input[name="orther"]')).val();
            let data = {
                start_time: start_time,
                company_name: company_name,
                end_time: end_time,
                level: level,
                orther: orther,
            }
            if ($(this).data('key') == 'store') {
                await postWork(data);
                var html = await getW();
                $('.list-wk').html(html);
            } else {
                const id = $(document.querySelector('input[name="id"]')).val();
                await updateWork(id, data);
                var html = await getW();
                $('.list-wk').html(html);
            }
            [...document.getElementsByClassName("form-add")].map(n => n && n.remove());

        });

        $(document).on('click', '.cancel', async function () {
            var html = await getW(true);
            $('.list-wk').html(html);
        })

    },
};

export default getWorkAdmin;