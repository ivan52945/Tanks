export default function randIntFrZ(to: number) {
    const random = Math.random() * (to + 1);
    return Math.floor(random);
}
