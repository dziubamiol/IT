function number(data) {
    return parseFloat(data) && isFinite(data);
}

function string () {
    return true;
}

export default {
    number,
    string
}