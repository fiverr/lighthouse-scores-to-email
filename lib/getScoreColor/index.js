module.exports = function getScoreColor(score) {
    switch (true) {
        case (score >= 90):
            return '#2ecc71';
        case (score >= 50 && score < 90):
            return '#f39c12';
        default:
            return '#c0392b';
    }
};
