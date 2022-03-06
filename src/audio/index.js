import climber from "./theclimber-simon folwar.mp3";
import whoosh from "./woosh.mp3";
import secondWhoosh from "./secondW.mp3";
import redMist from "./redMist.mp3";

const bgMusic = new Audio(climber);
bgMusic.loop = true;
bgMusic.volume = 0.4;

const roolMusic = new Audio(secondWhoosh);
const endMusic = new Audio(redMist);

export { bgMusic, roolMusic, endMusic };
