import { getWork } from "@/api/work";

const WorkPage = {
        async render() {
            const { data: works } = await getWork();

            return /* html */ `
                <li class="l-section section  ">
                    <div class="work">  
                        <div class="row">
                        ${works.map((item) => /* html */`
                            <div class="col-lg-6">
                                <div class="card mb-4">
                                    <h5 class=" ">Công ty : ${item.company_name} : ${item.start_time} - ${item.end_time}</h5>
                                    <p class="">Trình độ : ${item.level} </strong> </p>
                                    <p class="">Khác : ${item.orther} </p>
                                    <p></p>
                                </div>
                            </div>
                                        `).join("")}
                            
                        </div>
                    </div>
                </li>
            `;
    },
    jsInitScript() {},
};

export default WorkPage;