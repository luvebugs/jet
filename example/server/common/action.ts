/**
 * @file action.js
 * @author sunxiaoxu01
 * @description action demo
 */

export default class BaseAction {
    public req: any;
    public res: any;
    public next: any;

    public constructor({req, res, next}: any) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    /**
     * render result with json
     * renderJson
     * @param array $data
     */
    public async renderJson(data: any, errno?: any, msg?: any) 
    {
        return this.res.api(data, errno, msg);
    }

    /**
     * render result with tpl
     * renderTpl
     * @param array $data
     */
    public async renderTpl(tpl: any, data?: any) 
    {
        return this.res.renderTpl(tpl, data);
    }

    /**
     * send file
     * sendFile
     * @param array $data
     */
    public async sendFile(path: any, filename?: any) 
    {
        return this.res.sendFileAndAttachment(path, filename);
    }

    /**
     * execute
     * execute
     * @param array $data
     */
    public async execute(req: any, res:any) {}

    public async checkUc() {
        if (this.req.ucClient) {
            const data = await this.req.ucClient.validate();
            if (!data.jumped) {
                return true;
            }
        }
        return false;
    }
    public async getUcInfo() {
        const data = await this.req.ucClient.validate();
        return data;
    }
    public log(data: any) 
    {        
        console.log(`log`, data);
    }
    public async getParam() {
        let params = {};
        if (this.req.method === 'get') {
            params = this.req.query
        } else {
            params = this.req.body || this.req.query
        }
        return params;
    }
    public async setHeader(key: any, value: any) {
        this.res.set(key, value);
    }
}
