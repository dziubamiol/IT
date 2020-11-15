function number(data) {
    if (data.includes('.')) return parseFloat(data);

    return parseInt(data);
}

function string(data) {
    return data.toString();
}

export default {
    number,
    string
}