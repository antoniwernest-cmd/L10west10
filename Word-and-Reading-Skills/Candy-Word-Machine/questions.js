const start = "Add a first letter";
const group = "Add a letter group at the start";
const end = "Add a word ending";

// Each row supplies three correct tiles and seven distractors. Only the
// three chosen words are ever shown as finished words.
const challenges = [
  [start, "", "ark", "b d p", "g j q u v x z"],
  [start, "", "ake", "b c l", "e g i o q v z"],
  [start, "", "ell", "b s t", "a j k q u v z"],
  [start, "", "ish", "d f w", "g j k o q v z"],
  [start, "", "est", "b n r", "a i k o q u z"],
  [start, "", "ail", "m p s", "e g k o q u z"],
  [start, "", "ock", "l r s", "a e g q u v z"],
  [start, "", "ame", "c g n", "a e i j q u z"],
  [group, "", "ip", "cl sh tr", "br fr gl pl st sw th"],
  [group, "", "og", "bl fr cl", "br cr gl pl sk sw th"],
  [group, "", "ack", "bl cl st", "br dr gl gr pl pr sw"],
  [group, "", "ing", "br cl sw", "dr fr gl pl pr sn tr"],
  [group, "", "ow", "bl gl sn", "cl dr fr pr sp sw th"],
  [group, "", "eep", "cr sl sw", "br cl dr fl gl pl tr"],
  [group, "", "ink", "bl dr th", "fl fr gl pr sp sw tr"],
  [group, "", "ake", "br sh sn", "bl cl fr gl pl sw th"],
  ["Add a first sound", "", "unch", "br cr l", "bl cl dr fl gr sh th"],
  [end, "ca", "", "p t b", "f g j q v x z"],
  [end, "pa", "", "ck n t", "ch ft lk mp sk sp xt"],
  [end, "be", "", "ll d st", "ch ft lk mp sh sk xt"],
  [end, "ri", "", "b m ng", "lk mp rk sh st th xt"],
  [end, "ha", "", "t m nd", "ch ft lk mp sk sl xt"],
  [end, "ro", "", "ck d pe", "ch ft lk sh sk sl xt"],
  [end, "fl", "", "ag ap ip", "eg em et im ot ud um"],
  ["Add an ending to help", "help", "", "s ed ing", "en es ly est y ment ness"],
  ["Add an ending to jump", "jump", "", "s ed ing", "es en est ly ment ness ful"],
  ["Add an ending to paint", "paint", "", "s ed ing", "es en ly ment ness est ful"],
  ["Add an ending to care", "care", "", "ful less s", "ed ing ly ness able est ment"],
  ["Add an ending to soft", "soft", "", "er est ly", "able ed es ful ing ment ous"],
  ["Add a middle vowel", "c", "t", "a o u", "b d e f g j p"],
].map(([instruction, left, right, correct, other], id) => {
  const answers = correct.split(" ");
  const tiles = [...answers, ...other.split(" ")];
  return { id, instruction, left, right, answers, tiles };
});
