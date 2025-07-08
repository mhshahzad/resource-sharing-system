import {User} from "../../schema/user.schema";
import {jsonToObj} from "../../../utils/jsonToObj";

const users = jsonToObj<User[]>("./data/user.example.json");

/**
 * Returns a shallow copy of all users.
 *
 * @returns {User[]} An array containing all User objects.
 */
export const getAllUsers = (): User[] => {
    return users.map(user => user);
}