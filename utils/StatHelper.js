const StatHelper = {

    calculateDecisionAccuracy(playingStats) {
        var correctDecisions = playingStats.filter(stat => stat.correctDecision === stat.playerDecision)
        return correctDecisions.length/playingStats.length
    },

    calculateRunningCountAccuracy(runningCountStats) {
        if (runningCountStats.length === 0) {
            return null;
        }
        return (runningCountStats.filter(stat => stat.playerError === 0).length)/(runningCountStats.length)
    },

    calculateAverageCountError(runningCountStats) {

        if (runningCountStats.length === 0) {
            return null;
        }
        var total = 0;
        var count = 0
        for (const stat of runningCountStats) {
            if (stat.playerError !== 0) {
                total += stat.playerError;
                count += 1
            }
        }
        return total/count
    },

    calculateAbsoluteCountError(runningCountStats) {
        if (runningCountStats.length === 0) {
            return null;
        }
        var total = 0;
        var count = 0
        for (const stat of runningCountStats) {
            if (stat.playerError !== 0) {
                total += Math.abs(stat.playerError);
                count += 1
            }
        }
        return total/count
    }

}

module.exports = StatHelper