class HBodyDecrypt {
    static KEY_LENGTH=640
    static createNewKey() {
        return "empty"
    }
    static XOR_KEY= HBodyDecrypt.createNewKey()
    static decryptBody(body) { //Buffer
        let result=""
        const data=body.subarray(512).toString('utf8')
        for (let i = 0; i < data.length; i++) {
            result+=String.fromCharCode(data.charCodeAt(i) ^ HBodyDecrypt.CONST_XOR_KEY.charCodeAt(i % HBodyDecrypt.CONST_XOR_KEY.length) ^ HBodyDecrypt.XOR_KEY.charCodeAt(i%HBodyDecrypt.XOR_KEY.length))
        }
        return result
    }
    static CONST_XOR_KEY = 'srw3X8!ETouKDOEnZHKV0IMvhsAJmySnByU9ir^C1oob9Anf^2rnf1FN6Xy6sh@N!mXenyUsBiqEyeqJQ5BhFs8x8tRJWLSkfMGIaz4Bs8v3rQFSpO@fakyogTuYFRxc'
    static CONST_XOR_KEY_LENGTH = HBodyDecrypt.CONST_XOR_KEY.length
    static COUNT_VALIDATE_SYMBOLS = 512
    static decryptUnknown(data) { //Buffer
        const first_part = '{"date":16'
        let KEY_SIZE = 1000//640
        const vacab = [
            '\'{"date":16\'',
            'SpecialOfferInventoryIconWithTimerAndArrow',
            'SPECIALOFFER',
            'applicationId',
            'artifactGetChestLevel',
            'imageURL',
            'indexVersionUrls',
            'reward',
            'settings',
            'group',
            'progress',
            'background',
            'stars"',
            'runes"',
            "valkyrie",
            "Migration",
            "amount",
            "expedition",
            "require",
            '"duration"',
            '"day"',
            '"rarity"',
            '"heroes"',
            '"attemptsLeft"',
            '"slotId"',
            '"consumable"',
            '"lastUpdateDate"',
            '"floor"',
            '"mercenaries"',
            '"chestsOpened"',
            '"mayBuySkip"',
            '"mayFullSkip"',
            '"skipBought"',
            '"chestSkip"',
            '"fullSkipCost"',
            '"starmoney"',
            '"crownsCount"',
            '"defenders"',
            '"response":',
            '"status"',
            '"power"',
            '"duration"',
            '"ident":"',
            '"arenaPlace":',
            '"arenaHeroes"',
            '"backgroundTexture"',
            '"vipPoints',
            // 'null',
            '"localeData":',
            '"lastRefill":',
            '"imageAtlas":',
            //  'CDATA',
            '"billingsUpdate"',
            '"result',
            '"bundleId"',
            '"lastRefill"',
            '"reward":{"consumable"',
            '"hero',
            '"gold',
            '"oneTime",',
            '"fragmentHero":',
            '"battleFeatures',
            '{"date":166',
            'Features":[',
            'magicPower',
            '"slots":[',
            '"currentSkin":',
            ',"isDead":',
            '"morriganRework"',
            '"name":',
            '"titanGiftLevel',
            '"magicResist',
            '"skills',
            'appStorePriceMatrixTier',
            'subscriptionId',
            '"lastLoginTime',
            '"titanCoinsSpent',
            '"fixDorianHeal"',
            '"fixBattleStatOnTakeDamage',
            '"energy',
            'win":false',
            'win":true',
            'power',
            'titanCoinsSpent',
            'serverVersion',
            'fixBattleStatOnTakeDamage',
            'ignoringHooks',
            'isDead":false',
            'battleGetByType',
            'energy":100,"isDead',
            "emptyMarkEffect",
            "buffViewDurationFix",
            "mayaFixUltVisual",
            "hooksRefactoring",
            "fixMorriganDefferedViewInvalids",
            "fixRessurectionInvalids",
            "fixCustomEffectCancelingInvalids",
            "singleValueToArrayFix",
            "fixForEachLoopsInvalids",
            'replays":[{"userId',
            'clanId',
            'clanRole',
            'avatarId',
            'currentSkin',
            'skinsInfo',
            'isChatModerator',
            'frameId',
            'borderId":null,"isChatModerator',
            'strength',
            'intelligence',
            'intelligence',
            'intelligence',
            'intelligence',
            'customEffect',
            'physicalAttack',
            'mojoComponentsUpdate',
            'artifacts',
            'color',
            'skins',
            'fixRessurectionInvalids","fixCustomEffectCancelingInvalids',
            'titanGiftLevel',
            'skins":[],"currentSkin":0,"titanGiftLevel',
            'level',
            'fixForEachLoopsInvalids","battleFeature_1","customEffect',
            "BILLING",
            "Disposer",
            "Freakshow",
            "Hallowwolf",
            "SPECIAL",
            "SPECIALOFFER",
            "SpecialOfferInventoryIconWithTimerAndArrow",
            "VIPChatEnabled",
            "accountId",
            "agility",
            "akamaihd",
            "alignment",
            "appStorePriceMatrixTier",
            "applicationId",
            "arePointsMax",
            "arenaBest",
            "arenaGetAll",
            "arenaHeroes",
            "arenaPlace",
            "arenaPower",
            "arrowDirection",
            "artifactGetChestLevel",
            "artifacts",
            "assetClip",
            "assetIdent",
            "assetLib",
            "attackers",
            "attemptsLeft",
            "authToken",
            "available",
            "availableFarm",
            "availableToday",
            "availableUntil",
            "availableVip",
            "avatarId",
            "background",
            "backgroundTexture",
            "banUntil",
            "battleEffects",
            "battleFeature",
            "battleFeatures",
            "battleIsAllowed",
            "battlePass",
            "battlePassExp",
            "battles",
            "bezabidka",
            "billing",
            "billingBuyDelta",
            "billingGetAll",
            "billingGetLast",
            "billings",
            "billingsUpdate",
            "blackList",
            "blackfriday",
            "bonusRewardComment",
            "borderId",
            "boughtToday",
            "buffViewDurationFix",
            "bundleId",
            "bundleiconsharedassets",
            "buttons",
            "buyRequirement",
            "campaign",
            "carousel",
            "chatStatus",
            "clanGetInfo",
            "clanRole",
            "clanWarGetBriefInfo",
            "clanWarGetWarlordInfo",
            "clientData",
            "closeOffer",
            "consolationPrize",
            "consumable",
            "cooldown",
            "currentDay",
            "currentReward",
            "currentSkin",
            "currentVersionIndex",
            "customEffectsToLib",
            "dailyBonusGetInfo",
            "dailyReward",
            "daysInMonth",
            "decoration",
            "defenders",
            "disabled",
            "draftEnemy",
            "dungeon",
            "duration",
            "effects",
            "emptyMarkEffect",
            "endTime",
            "enemies",
            "enemyUser",
            "energyBoost",
            "energyDelta",
            "energyKeep",
            "energySpent",
            "eventLoopData",
            "exchangeRule",
            "expeditionGet",
            "experience",
            "farmedRewards",
            "feedbackRating",
            "fixBattleStatOnTakeDamage",
            "fixCustomEffectCancelingInvalids",
            "fixDorianHeal",
            "fixForEachLoopsInvalids",
            "fixGetValueInHealComponent",
            "fixMorriganDefferedViewInvalids",
            "fixRessurectionInvalids",
            "fragmentArtifact",
            "fragmentGear",
            "fragmentHero",
            "fragmentScroll",
            "frameId",
            "gameTimeTs",
            "gdprAccepted",
            "getAccount",
            "getPushdCredentials",
            "getTime",
            "goldenPass",
            "goldenPassPurchaseDate",
            "goldenPassType",
            "grandBest",
            "grandCoin",
            "grandCoinTime",
            "grandHeroes",
            "grandPlace",
            "grandPower",
            "groupOrder",
            "guildbundle",
            "gz?hash=",
            "hasActiveWar",
            "heroExp",
            "heroGetAll",
            "heroSpecialsRemoving",
            "heroesmobile",
            "homescreen",
            "hooksRefactoring",
            "horizontal",
            "ignoringHooks",
            "imageAtlas",
            "imagePath",
            "imageTexture",
            "imageURL",
            "inSlotPriority",
            "indexVersionUrls",
            "intelligence",
            "interface",
            "internal",
            "inventoryGet",
            "isChatModerator",
            "isEnableIdfa",
            "journal",
            "juancho",
            "lastLoginTime",
            "lastMessageTime",
            "lastRefill",
            "lastUpdateDate",
            "letters",
            "localeData",
            "localeKey",
            "locales",
            "lootbox",
            "magicPower",
            "magicResist",
            "mailGetAll",
            "managers",
            "mandatory",
            "matchId",
            "maxLevel",
            "maxMigrationServer",
            "mayaFixUltVisual",
            "message",
            "messages",
            "mission",
            "missionGetAll",
            "mojoComponentsUpdate",
            "morriganRework",
            "multiplier",
            "nearestWarEndTime",
            "networkIdent",
            "newQuests",
            "nextDayTime",
            "nextDayTs",
            "nextWarTime",
            "nexters",
            "notFarmedDays",
            "odnoklassniki",
            "offerData",
            "offerGetAll",
            "offerType",
            "offerWallId",
            "onMission",
            "oneTime",
            "operator",
            "padding",
            "permanent",
            "personalMerchant",
            "physicalAttack",
            "placementAvailable",
            "placementRewards",
            "placementViewed",
            "premium",
            "premiumPlus",
            "priceVersion",
            "priority",
            "productId",
            "progress",
            "pushRewardId",
            "questGetAll",
            "questGetEvents",
            "questGetPaymentDependent",
            "refillable",
            "refreshTime",
            "repeatableOffer",
            "replays",
            "requirement",
            "resetTime",
            "resetToday",
            "response",
            "results",
            "retentionReward",
            "revision",
            "robbers",
            "saleDescription",
            "saleValue",
            "selfIgnoreInCanTarget",
            "senderId",
            "serverId",
            "serverNum",
            "serverTransfer",
            "serverVersion",
            "servers",
            "sessionId",
            "settings",
            "settingsGetAll",
            "shortAttemptsLeft",
            "singleValueToArrayFix",
            "skincoin",
            "skinsInfo",
            "smartbundle",
            "sortOrder",
            "soundtrack",
            "specialoffer",
            "splitGetMap",
            "stageFinishTs",
            "stageId",
            "stamina",
            "starmoney",
            "starmoneySpent",
            "startTime",
            "staticVersionUrl",
            "storyId",
            "strength",
            "subscribeServer",
            "subscription",
            "subscriptionGetInfo",
            "subscriptionId",
            "supportLink",
            "syncSystem",
            "targetAdsAccepted",
            "teamGetAll",
            "textmeshprofonts",
            "timePressing",
            "timeZone",
            "titanCoinsSpent",
            "titanGetAll",
            "titanGetSummoningCircle",
            "titanGiftLevel",
            "titanhunters",
            "towerGetInfo",
            "transfer",
            "triesSpent",
            "tutorial",
            "tutorialGetInfo",
            "tutorialStep",
            "userGetAvailableAvatars",
            "userGetInfo",
            "valkyrie",
            "version",
            "vertical",
            "vipPoints",
            "zeppelinGiftGet"
        ]
        const blackListVacab=[
            /* 'customEff5',
             'lev5t',
             'intelligen2'*/
        ]
        const getScores = function (p, isDebug) {
            let score = 0
            for (const w of blackListVacab) {
                if (p.includes(w)) {
                    return 0;
                }
            }
            for (const w of vacab) {
                for (let i = 4; i < w.length; i++) {
                    const word = w.substr(0, i)
                    let step = 1
                    let pos = 0
                    let lastPos = 0
                    let lastFailPos = 0
                    while (true) {
                        lastPos = pos
                        pos = p.indexOf(word, pos);
                        if (pos >= 0) {
                            score += i;
                            pos += step;
                        } else {
                            lastFailPos = lastPos
                            break;
                        }
                    }
                }
                for (let i = w.length - 4; i > 0; i--) {
                    const word = w.substr(i)
                    let step = 1
                    let pos = 0
                    let lastPos = 0
                    let lastFailPos = 0
                    while (true) {
                        lastPos = pos
                        pos = p.indexOf(word, pos);
                        if (pos >= 0) {
                            score += i;
                            pos += step;
                        } else {
                            lastFailPos = lastPos
                            break;
                        }
                    }
                }
            }
            return score
        }

        let last_score = 1
        let initial_key_hex = ''

        initial_key_hex=initial_key_hex.replaceAll("\r", "")
        initial_key_hex=initial_key_hex.replaceAll("\n", "")
        initial_key_hex=initial_key_hex.replaceAll(" ", "")

        let currentKeyLength = ~~(initial_key_hex.length / 2);
        if (initial_key_hex.length === 0) {
            for (let i = 0; i < first_part.length; i++) {
                initial_key_hex += (data.charCodeAt(i) ^ first_part.charCodeAt(i) ^ HBodyDecrypt.CONST_XOR_KEY.charCodeAt(i % HBodyDecrypt.CONST_XOR_KEY_LENGTH)).toString(16).padStart(2, '0')
            }
            currentKeyLength = 0
        }
        const initial_key_length = ~~(initial_key_hex.length / 2)
        currentKeyLength=initial_key_length

        let debugIt = true
        console.log(Buffer.from(initial_key_hex,'hex').toString(), initial_key_length)

        let currentKey = Buffer.from(initial_key_hex
            .substring(0, KEY_SIZE * 2)
            .padEnd(KEY_SIZE * 2, '0'), 'hex')

        for (let tryKeySize = 4; tryKeySize < data.length && tryKeySize < 1000; tryKeySize++) {
            let isGoodKeySize = true;
            for (let i = 0; i < data.length; i++) {
                let keyIndex = i % tryKeySize
                if (keyIndex < initial_key_length) {
                    let keyCharCode = currentKey.readUInt8(keyIndex)
                    let xoredCharCode = data.charCodeAt(i) ^ keyCharCode ^ HBodyDecrypt.CONST_XOR_KEY.charCodeAt(i % HBodyDecrypt.CONST_XOR_KEY_LENGTH)
                    if ((xoredCharCode < 0x20 || xoredCharCode > 0x7e) && xoredCharCode!==10 && xoredCharCode!==13) {
                        console.log("KEY try:",tryKeySize,xoredCharCode.toString(16),keyCharCode.toString(16),String.fromCharCode(keyCharCode))
                        isGoodKeySize = false
                        break;
                    }
                }
            }
            if (isGoodKeySize) {
                console.log("!!! GOOD keysize " + tryKeySize)
                KEY_SIZE = tryKeySize
                break;
            }
        }
        currentKey = Buffer.from(initial_key_hex
            .replaceAll("\r", "")
            .replaceAll("\n", "")
            .replaceAll(" ", "")
            .substring(0, KEY_SIZE * 2)
            .padEnd(KEY_SIZE * 2, '0'), 'hex')

        if (initial_key_length === KEY_SIZE) {
            console.log("KEY ALREADY FOUND. Exiting")
            console.log(currentKey.toString('hex'))
        } else {
            for (let keyTryIndex = currentKeyLength; keyTryIndex < KEY_SIZE; keyTryIndex++) {
                const keyCodeTryMap = []
                let lastGoodResult = ""
                for (let keyCodeToTry = 0; keyCodeToTry < 256; keyCodeToTry++) {
                    if ((keyCodeToTry < 0x20 || keyCodeToTry > 0x7e) && keyCodeToTry!==10 && keyCodeToTry!==13) {
                        continue;
                    }
                    let dataForCurrentKey = ""
                    let allDataForCurrentKey = ""
                    let skipped = 0
                    for (let i = 0; i < data.length; i++) {
                        let keyIndex = i % KEY_SIZE
                        if (keyIndex <= Math.max(keyTryIndex, initial_key_length)) {
                            let keyCharCode = (keyIndex === keyTryIndex ? keyCodeToTry : currentKey.readUInt8(keyIndex))
                            const xoredCharCode = (data.charCodeAt(i) ^ keyCharCode ^ HBodyDecrypt.CONST_XOR_KEY.charCodeAt(i % HBodyDecrypt.CONST_XOR_KEY_LENGTH))
                            const xoredChar = String.fromCharCode(xoredCharCode)
                            dataForCurrentKey += xoredChar
                            if ((xoredCharCode < 0x20 || xoredCharCode > 0x7e) && xoredCharCode!==10 && xoredCharCode!==13) {
                                allDataForCurrentKey += dataForCurrentKey
                                allDataForCurrentKey += "|"
                                skipped++
                                dataForCurrentKey = ""
                                continue;
                            }
                            if (keyIndex === Math.max(keyTryIndex, initial_key_length)) {
                                allDataForCurrentKey += dataForCurrentKey
                                allDataForCurrentKey += "|||"
                                dataForCurrentKey = ""
                            }
                        }
                    }

                    if (skipped === 0) {
                        let sc = getScores(allDataForCurrentKey, false)
                        const newRec = {k: keyCodeToTry, score: sc}
                        if (debugIt) {
                            newRec.result = allDataForCurrentKey
                        }
                        keyCodeTryMap.push(newRec)
                        lastGoodResult = allDataForCurrentKey
                    }


                }
                keyCodeTryMap.sort((a, b) => {
                    return b.score - a.score
                })
                if (keyCodeTryMap.length > 0) {

                    console.log("Z0", keyCodeTryMap[0].score)

                    if (debugIt) {
                        console.log("\r\nBest score: k=" + keyCodeTryMap[0].k.toString(16).padStart(2, '0') + " s=" + keyCodeTryMap[0].score + " :::" + keyCodeTryMap[0].result)
                    }

                    if (keyCodeTryMap[0].score >= last_score || true) {
                        currentKey.writeUint8(keyCodeTryMap[0].k, keyTryIndex)
                        console.log("Scores: " + keyCodeTryMap[0].score + ">" + last_score + " for step:" + keyTryIndex + " ckl=")
                        last_score = keyCodeTryMap[0].score
                        console.log("Key new: " + currentKey.toString())
                        console.log(lastGoodResult.replace(/[\r\n\t]/g, ''))
                    } else {
                        if (debugIt) {
                            lastGoodResult=keyCodeTryMap[0].result
                        }
                        console.log("Result DONE: " + keyTryIndex + "  for " + keyCodeTryMap[0].score + "<" + last_score)
                        console.log("Current key: " + currentKey.toString())
                        console.log("\r\nBest score: k=" + keyCodeTryMap[0].k.toString(16).padStart(2, '0') + " s=" + keyCodeTryMap[0].score + " :::" + lastGoodResult)
                        break;
                    }
                } else {
                    console.log("NO Z:")
                    console.log("Last result:" + lastGoodResult)
                    console.log("Current key: " + currentKey.toString('hex'))
                    console.log("Key DONE: cur_key_length:" + keyTryIndex)
                    console.log(currentKey.toString('hex'))
                    break;
                }
            }
        }
        HBodyDecrypt.XOR_KEY=currentKey.toString()
        let decrypted=''
        for(let i=0;i<data.length;i++) {
            decrypted+=String.fromCharCode(data.charCodeAt(i) ^ currentKey.readUInt8(i%KEY_SIZE) ^ HBodyDecrypt.CONST_XOR_KEY.charCodeAt(i % HBodyDecrypt.CONST_XOR_KEY_LENGTH));
        }
        return decrypted
    }

    static removeHttpHeader(data) { //Buffer
        return data.subarray(data.indexOf("\r\n\r\n") + 4)
    }

    static removeSignature(data) { //
        return data.subarray(HBodyDecrypt.COUNT_VALIDATE_SYMBOLS)
    }
}


module.exports = HBodyDecrypt
