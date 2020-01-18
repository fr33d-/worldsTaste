import axios from 'axios';
import jwt from 'jsonwebtoken';
import { authURL, baseURL } from '../../data';
import { User } from '../../helpers/types';

export const login = async (username: string, password: string): Promise<void> => {
    return await axios
        .post<string>(`${baseURL}${authURL}/login`, { username, password })
        .then((response) => {
            sessionStorage.setItem('auth', response.data);
            return response;
        })
        .catch((error) => {
            return error;
        });
};

// export const useJwt = (): User | undefined => {
//     const jwtObj = sessionStorage.getItem('auth');

//     if (jwtObj == null && typeof jwtObj !== 'string') {
//         return;
//     } else {
//         const jwtJson = jwt.decode(jwtObj);

//         if (
//             jwtJson !== null &&
//             typeof jwtJson !== 'string' &&
//             jwtJson['userId'] !== null &&
//             jwtJson['username'] !== null &&
//             jwtJson['name'] !== null &&
//             jwtJson['role'] !== null
//         ) {
//             return {
//                 id: jwtJson['userId'],
//                 username: jwtJson['username'],
//                 name: jwtJson['name'],
//                 role: jwtJson['role'],
//             };
//         }
//     }
// };
