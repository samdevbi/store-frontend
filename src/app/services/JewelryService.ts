
import axios from "axios";
import { serverApi } from "../../lib/config";
import { Jewelry, JewelryInquiry } from "../../lib/types/jewelry";
class JewelryService {
    private readonly path: string;
    constructor() {
        this.path = serverApi;
    }
    public async getJewelries(input: JewelryInquiry): Promise<Jewelry[]> {
        try {
            let url = `${this.path}/jewelry?page=${input.page}&limit=${input.limit}&order=${input.order}`;
            if (input.jewelryGender) url += `&jewelryGender=${input.jewelryGender}`;
            if (input.jewelryType) url += `&jewelryType=${input.jewelryType}`;
            if (input.jewelryMaterial) url += `&jewelryMaterial=${input.jewelryMaterial}`;
            if (input.search) url += `&search=${input.search}`;
            console.log("url:", url);

            const result = await axios.get(url);
            console.log("getJewelries", result);
            return result.data;
        } catch (err) {
            console.log("Error, Jewelries: ", err);
            throw err;
        }
    }

    public async getJewelry(jewelryId: string): Promise<Jewelry> {
        try {
            const url = `${this.path}/jewelry/${jewelryId}`;

            console.log("jewelryId:", jewelryId);

            console.log("url:", url);

            const result = await axios.get(url, { withCredentials: true });

            return result.data;
        } catch (err) {
            console.log("Error, getJewelry:", err);
            throw err;
        }
    }
}
export default JewelryService;