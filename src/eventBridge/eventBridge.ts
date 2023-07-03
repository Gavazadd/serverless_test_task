import serverless from "serverless-http";
import {deactivateAllExpired, getAllLinks} from "../database/linkQueries";
import {sendEmail} from "../ses/ses";
import {sqsService} from "../sqs/sqsService";

const deactivateExpired = async () => {
    try {
        const currentDate =  Date.now();
        const expriredLINKS = []
        const allLinks = await getAllLinks()
        if (allLinks.Items !== undefined ){
            for (const link of allLinks.Items){
                if (Number(link.lifeDays) < currentDate){
                    expriredLINKS.push(link)
                }
            }
        }

        await sqsService(expriredLINKS);
    } catch (e: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `${e}`,
                errorMsg: e?.message,
                errorStack: e?.stack
            })
        };
    }
};

export const handler = serverless(deactivateExpired);
