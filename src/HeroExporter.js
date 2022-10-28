class HeroExporter {

    static recursiveSearchAndParse(treeNodeName, treeNode, context, heroCb, accountCb, replayCb) {
        if (treeNode) {
            if (treeNode?.currentSkin!==null && treeNode?.currentSkin!==undefined ) {
                heroCb(treeNode,context)
                return
            }
            if (treeNode?.accountId && treeNode?.lastLoginTime) {
                accountCb(treeNode,context)
                return
            }
            const isAccountNode=treeNode?.serverVersion && treeNode?.attackers && treeNode?.defenders
            if (isAccountNode) {
                replayCb(treeNode,context)
                context.attackersAccountId=treeNode?.userId
                context.defendersAccountId=treeNode?.typeId
                context.heroesDate=~~treeNode?.startTime
            }
            let isAttackersOrDefendersNode=false
            if (treeNodeName==="attackers") {
                isAttackersOrDefendersNode=true
                context.accountId=context.attackersAccountId
            }
            if (treeNodeName==="defenders") {
                isAttackersOrDefendersNode=true
                context.accountId=context.defendersAccountId
            }
            const keys = treeNode instanceof Object ? Object.keys(treeNode) : [];
            for (const key of keys) {
                const objval = treeNode[key];
                HeroExporter.recursiveSearchAndParse(key,objval,context, heroCb,accountCb,replayCb);
            }
            if (isAccountNode) {
                context.attackersAccountId=undefined
                context.defendersAccountId=undefined
                context.heroesDate=undefined
            }
            if (isAttackersOrDefendersNode) {
                context.accountId=undefined
            }
        }
    }

    static extractData(currentAccountId, responseBody) {
        let result={heroes:[],accounts:[],replays:[]}
        let currentTS=Date.now()
        let found=false
        HeroExporter.recursiveSearchAndParse(null,responseBody,{},(heroConfig, context)=>{
            heroConfig.accountId=context?.accountId || currentAccountId
            heroConfig.lastUpdateTime=context?.heroesDate || currentTS
            result.heroes.push(heroConfig)
            found=true
        },(accountData,context)=>{
            if (accountData?.refillable) accountData.refillable=undefined
            result.accounts.push(accountData)
            found=true
        },(replayData,context)=>{
            result.replays.push(replayData)
            found=true
        })

        if (found) return result
        return undefined
    }
}
module.exports=HeroExporter