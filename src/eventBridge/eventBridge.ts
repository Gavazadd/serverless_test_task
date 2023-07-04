import serverless from "serverless-http";
import { getAllLinks} from "../database/linkQueries";
import {sqsService} from "../sqs/sqsService";
import {ScanCommandOutput} from "@aws-sdk/client-dynamodb";

const deactivateExpired = async () => {
    try {
        const currentDate:number =  Date.now();
        const expriredLINKS:any[] = []
        const allLinks: ScanCommandOutput = await getAllLinks()
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

export const handler: serverless.Handler = serverless(deactivateExpired);
