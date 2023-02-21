import { getProject } from "@/api/project";

const ProjectPage = {
        async render() {
            const { data: project } = await getProject();
            return /* html */ `
              <li class="l-section section">
                <div class="about">
                  <div class="  row">

                  ${project.map((item) => /* html */`
                    <div class=" col-lg-6"> 
                      <div class="card "> 
                        <p>Dự án : ${item.title} </p>
                        <p>Chi tiết : ${item.detail}</p>
                        <p>Size : ${item.size}</p>
                        <p>Vị trí : ${item.position}</p>
                        <p>Công nghệ : ${item.technologies}</p>
                        <p>Github link : ${item.github_link}</p>
                        <p>Demo link : ${item.demo_link}</p>
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

export default ProjectPage;