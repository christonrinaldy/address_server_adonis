import Redis from '@ioc:Adonis/Addons/Redis';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { curly } from 'node-libcurl'

type kelurahan = {
    id: string,
    kecamatan: string,
    nama: string
}
type kecamatan = {
    id: string,
    kota_id: string,
    nama: string
}
type kota = {
    id: string,
    provinsi_id: string,
    nama: string
}
type provinsi = {
    id: string,
    nama: string
}
type location = {
    status: string,
    address_kelurahan: Array<kelurahan>
    address_kecamatan: Array<kecamatan>,
    address_kota: Array<kota>,
    address_provinsi: Array<provinsi>

}

export default class LocationsController {
    static async getLocationById(ctx: HttpContextContract) {
        if (!ctx.request.hasBody()) {
            ctx.response.status(400).send("Bad Request!");
            return;
        }
        const { id } = ctx.request.body()
        var redisLocation: (string | null) = await Redis.get('location')
        if (redisLocation == null) {
            let result: any;

            var { data } = await curly.get("https://kasirpintar.co.id/allAddress.txt")
            var objData: location = await JSON.parse(data);

            await Redis.set("location", data)

            for (const key in objData) {
                if (objData[key] == "status" || objData[key][0].id.length != id.length) continue
                for (let i = 0; i < objData[key].length; i++) {
                    if (objData[key][i].id == id) {
                        result = objData[key][i];
                        break;
                    }
                }
            }
            return result
        } else {
            var objData: location = await JSON.parse(redisLocation);
            let result: any | kecamatan | kelurahan | kota | provinsi | null;
            loop1: for (const key in objData) {
                if (key == "status") {
                    continue;
                };
                if (objData[key][0].id.length != id.length) {
                    continue;
                };
                for (let i = 0; i < objData[key].length; i++) {
                    if (objData[key][i].id == id) {
                        result = objData[key][i];
                        break;
                    }
                }
            }
            return result;
        }
    }
    static async getLocations(ctx: HttpContextContract) {
        if (!ctx.request.hasBody()) {
            ctx.response.status(400).send("Bad Request!");
            return;
        }

        let filter = ctx.request.body();

        var redisLocation: (string | null) = await Redis.get('location')
        if (redisLocation == null) {
            let result: any;

            var { data } = await curly.get("https://kasirpintar.co.id/allAddress.txt")
            var objData: location = await JSON.parse(data);

            await Redis.set("location", data)

            for (const key in objData) {
                if (objData[key] == "status") continue
                for (let par in filter) {
                    if (objData[key][0][par] != null) {
                        result = objData[key].filter(val => {
                            return val.par == filter.par
                        })
                    }
                }
            }
            return result
        } else {
            var objData: location = await JSON.parse(redisLocation);
            let result: any;
            loop1: for (const key in objData) {
                if (objData[key] == "status") continue
                for (let par in filter) {
                    if (objData[key][0][par] != null) {
                        result = objData[key].filter(val => {
                            return val[par] == filter[par]
                        })
                        break loop1;
                    }
                }
            }
            return result;
        }
    }
}
