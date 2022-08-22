export default function objectToSearch(obj){
    return new URLSearchParams(obj).toString();
}