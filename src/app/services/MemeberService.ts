import axios from "axios";
import { serverApi } from "../../lib/config";
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../../lib/types/member";
class MemberService {
    private readonly path: string;
    constructor() {
        this.path = serverApi;
    }
    public async getTopUsers(): Promise<Member[]> {
        try {
            const url = this.path + "/user/top-users";
            const result = await axios.get(url);
            return result.data;

        } catch (err) {
            console.log("Error getTopUsers:", err);
            throw err;
        }
    };

    public async getOwner(): Promise<Member> {
        try {
            const url = this.path + "/user/owner";
            const result = await axios.get(url);

            const owner: Member = result.data;
            return owner;

        } catch (err) {
            console.log("Error getTopUsers:", err);
            throw err;
        }
    };
    public async signup(input: MemberInput): Promise<Member> {
        try {
            const url = this.path + "/user/signup";
            const result = await axios.post(url, input, { withCredentials: true });
            console.log("sigpup:", result);

            const member: Member = result.data.member;
            console.log("member:", member);
            localStorage.setItem("memberData", JSON.stringify(member));

            return member;

        } catch (err) {
            console.log("Error signup:", err);
            throw err;
        }
    };


    public async login(input: LoginInput): Promise<Member> {
        try {
            const url = this.path + "/user/login";
            const result = await axios.post(url, input, { withCredentials: true });
            console.log("login:", result);

            const member: Member = result.data.member;
            console.log("member:", member);
            localStorage.setItem("memberData", JSON.stringify(member));

            return member;
        } catch (err) {
            console.log("Error login:", err);
            throw err;
        }
    }

    public async logout(): Promise<boolean> {
        try {
            const url = this.path + "/user/logout";
            const result = await axios.post(url, {}, { withCredentials: true });
            console.log("login:", result);

            localStorage.removeItem("memberData");

            return result.data.logout;
        } catch (err) {
            console.log("Error logout:", err);
            throw err;
        }
    };

    public async updateMember(input: MemberUpdateInput): Promise<Member> {
        try {
            const formData = new FormData();
            formData.append("memberNick", input.memberNick || "");
            formData.append("memberPhone", input.memberPhone || "");
            formData.append("memberEmail", input.memberEmail || "");
            formData.append("memberAddress", input.memberAddress || "");
            formData.append("memberDesc", input.memberDesc || "");
            formData.append("memberImage", input.memberImage || "");

            const result = await axios(`${serverApi}/user/update`, {
                method: "POST",
                data: formData,
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("updateMember", result);

            const member: Member = result.data;
            localStorage.setItem("memberData", JSON.stringify(member));
            return member;

        } catch (err) {
            console.log("Error updateMember:", err);
            throw err;
        }
    };

}

export default MemberService;