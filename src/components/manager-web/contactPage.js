import { getConnect } from "@/api/connect";
const ContactPage = {
        async render() {
            const { data: connect } = await getConnect();
            return /* html */ `
              <li class="l-section section">
                <div class="contact">
                  <div class="contact--lockup">
                    <div class="modal">

                      <div class="modal--information">
                        <p>Kết nối với tôi</p> 
                      </div>

                      <ul class="modal--options">

                      ${connect.map((item) => /* html */`
                        <li><a href="${item.data}">${item.label}</a></li>
                      `).join("")}

                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            `;
    },
    jsInitScript() {},
};

export default ContactPage;