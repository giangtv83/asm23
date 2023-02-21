import { getSkill } from "@/api/skill";

const AboutPage = {
  async render() {
    const { data: skills } = await getSkill();

    return /* html */ `
              <li class="l-section section">
                <div class="about">
                  <div class="about--banner">
                    <h2>Kỹ năng</h2>
                    
                    ${skills.map((item) => /* html */`
                        <a href="#0">${item.name} 
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-award-fill" viewBox="0 0 16 16">
                              <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z"/>
                              <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                            </svg>
                          </span>
                        </a> 
                      `).join("")}

                    <img src="assets/img/introduction-visual.png" alt="About Us">
                  </div>
                  <div class="about--options">
                    <a href="#0">
                      <h3>Công nghệ</h3>
                    </a>
                    <a href="#0">
                      <h3>Kỹ năng</h3>
                    </a>
                    <a href="#0">
                      <h3>Tư duy</h3>
                    </a>
                  </div>
                </div>
              </li>
            `;
  },
  jsInitScript() { },
};

export default AboutPage;