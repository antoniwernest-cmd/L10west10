// Each new blank replaces a word in the actual passage. A fourth field can
// name a phrase when the same word appears more than once.
const practice = {
  A: [
    {
      gaps: [["rail", "rope", "rake"]],
      checks: [
        ["What made the path slippery?", "Rain soaked the leaves", "Someone spilled paint", "The sun dried the path", "Read what happened before Malik arrived."],
      ],
    },
    {
      gaps: [["porch", "bench", "bus"]],
      checks: [
        ["Who read out the house numbers?", "Mrs. Chen", "Malik", "Samir", "Look for the speaker who helps them plan."],
      ],
    },
    {
      gaps: [["bucket", "blanket", "helmet"]],
      checks: [
        ["What did Malik want to do for fun?", "Ride bikes", "Paint a picture", "Fly a kite", "Read Malik’s question to his friends."],
      ],
    },
    {
      gaps: [["path", "road", "roof", "the path to Mr."]],
      checks: [
        ["What did Mei do while Malik worked?", "Held a bag open", "Ran to the playground", "Closed the gate", "Look for the action after ‘while’."],
      ],
    },
    {
      gaps: [["dry", "icy", "muddy"]],
      checks: [
        ["Who jumped into the leaf pile?", "Malik", "Mei", "Samir", "Look at the sentence after Mei calls out."],
      ],
    },
    {
      gaps: [["bucket", "shed", "bag"]],
      checks: [
        ["What did Mrs. Chen show Mei first?", "Which flowers had died", "Where the bikes were parked", "How to draw a maze", "Look at the beginning of the chapter."],
      ],
    },
    {
      gaps: [["shed", "street", "tree"]],
      checks: [
        ["Who carried the patio things?", "Mei and Samir", "Malik and Mr. D’Souza", "Malik and Mei", "Read the last sentence."],
      ],
    },
    {
      gaps: [["game", "chore", "tool"]],
      checks: [
        ["Who picked what to play first?", "Mei", "Malik", "Mrs. Chen", "Find the person who speaks at the park."],
      ],
    },
  ],
  AA: [
    {
      gaps: [["rail", "gate", "rake"], ["first", "later", "again"]],
      checks: [
        ["What did Malik do after Mr. D’Souza agreed?", "Went to get his friends", "Rode away to play", "Started pulling flowers", "Look at what Malik does before the porch meeting."],
        ["What did the porch light reflect off?", "The wet stones", "A bike helmet", "The dry grass", "Find what Malik noticed about the walk."],
      ],
    },
    {
      gaps: [["addresses", "games", "tools"], ["list", "rake", "helmet"]],
      checks: [
        ["What did Mrs. Chen want them to do before pulling plants?", "Check with her", "Count the rakes", "Visit the park", "Find Mrs. Chen’s request about the garden."],
        ["Why did Mei take the list?", "To check their work later", "To decide who could play", "To show where to park the bikes", "Read the end of the meeting."],
      ],
    },
    {
      gaps: [["gloves", "helmets", "pencils", "collected gloves and bags"], ["seat", "step", "table"]],
      checks: [
        ["Why did Mei spread the gloves out?", "So everyone could find a pair", "So they would be in the rain", "So they could count the neighbours", "Read what Mei does before they leave."],
        ["Why did Samir choose light rakes?", "The crew could carry and use them", "He wanted to leave the heavier ones at the park", "He planned to trade them for bikes", "Think about who was going to do the work."],
      ],
    },
    {
      gaps: [["steadied", "folded", "hid"], ["loose", "wet", "quiet"]],
      checks: [
        ["How did Malik get the stuck leaves loose?", "He used short pulls with the rake", "He poured more water on the walk", "He waited for the wind", "Look for the change in how Malik raked."],
        ["Why move the bags before asking Mr. D’Souza to look?", "So the walk would stay clear", "So no one could see the bags", "So they could rake the porch again", "Think about the goal of this visit."],
      ],
    },
    {
      gaps: [["winding", "straight", "square"], ["finish", "starting", "middle", "finish line for the relay"]],
      checks: [
        ["What did Mei ask runners to avoid in the maze?", "Stepping on a leaf wall", "Walking in a curve", "Taking turns", "Read what Mei says about her maze."],
        ["When did the next runner go?", "When the last runner came back", "As soon as the first runner started", "Before anyone picked up leaves", "Look at how they took turns."],
      ],
    },
    {
      gaps: [["stems", "cushions", "stones"], ["tag", "rake", "bag"]],
      checks: [
        ["Why did Mei pause before pulling the brown stem?", "She was unsure if it should stay", "She had finished every other job", "She needed the stem for a relay", "Think about what Mei asks Mrs. Chen."],
        ["What did the picture on the tag show?", "Flowers the plant would grow", "Where the tools belonged", "A map of the whole yard", "Read what Mrs. Chen shows Mei."],
      ],
    },
    {
      gaps: [["stakes", "bikes", "hooks"], ["shelf", "step", "bench"]],
      checks: [
        ["How did Malik help with the burlap?", "He held one edge while it was tied", "He put it on the shelf", "He pulled it through the branches", "Follow what the two people did with the cloth."],
        ["What still needed to be done?", "Put the tools back", "Build a new shed", "Ride to the next yard", "Check what Malik finds on the list."],
      ],
    },
    {
      gaps: [["promise", "score", "distance"], ["swings", "shed", "steps"]],
      checks: [
        ["What did Malik let Mei do first?", "Pick a game", "Choose the next yard", "Take the tools home", "Read what Malik says at the park."],
        ["Which part was fun before they reached the park?", "The leaf relay", "Looking for the addresses", "Putting the tools back", "Listen for the game Samir remembers."],
      ],
    },
  ],
  AAA: [
    {
      gaps: [["slick", "fluffy", "dry"], ["groceries", "bicycles", "flowers"], ["agreed", "left", "slipped"]],
      checks: [
        ["Which detail suggests the neighbour was uneasy?", "He gripped the rail tightly", "A bag sat on the porch", "Malik passed the gate", "Look for a body movement that shows worry."],
        ["What did Malik do to respect his neighbour’s choice?", "Waited for him to agree before getting help", "Decided which plants to pull", "Started the whole yard without asking", "Notice what Malik waited for."],
        ["What task depended on a clear walk?", "Bringing groceries in from the gate", "Putting the bikes away", "Finding the next house number", "Think about what he wanted to carry."],
      ],
    },
    {
      gaps: [["addresses", "helmets", "branches"], ["rows", "bags", "piles"], ["done", "wet", "late"]],
      checks: [
        ["What did each row on Mei’s page stand for?", "A different house and its jobs", "A different bike route", "A different person’s tools", "Read how Mei arranged the page."],
        ["When should the crew tick a box?", "When the neighbour says the job is done", "Before reaching a house", "As soon as a tool is packed", "Find Mrs. Chen’s direction."],
        ["Why did the walk come first on the list?", "It was the job they had agreed to do at the first house", "The garden was at High Park", "The walk took no tools", "Compare the order of the two visits."],
      ],
    },
    {
      gaps: [["expecting", "refusing", "forgetting"], ["handle", "hide", "paint"], ["destination", "disagreement", "rule"]],
      checks: [
        ["Which tools were picked for collecting leaves?", "Rakes and paper bags", "Gloves and a bucket only", "Helmets and a rake", "Match each tool to its job."],
        ["Why did Mei check the trip to the playground?", "To see if the compromise would work", "To change the neighbours’ addresses", "To prove a race was faster", "Consider why the playground’s location mattered."],
        ["What does ‘honour’ mean in Samir’s line?", "Keep an agreement", "Win a contest", "Delay a decision", "Think about what they had promised to do."],
      ],
    },
    {
      gaps: [["uneven", "smooth", "new"], ["narrowed", "widened", "vanished"], ["trace", "block", "guess"]],
      checks: [
        ["Which detail shows the biggest pile wasn’t the first priority?", "Malik started by the narrow part of the walk", "The others had paper bags", "The porch faced the lawn", "Compare the lawn with the path by the steps."],
        ["When did the others begin filling bags?", "After leaves were moved off the paving", "Before Malik arrived", "After the friends went to the park", "Look at what the others waited for."],
        ["What did the dry line show Mr. D’Souza?", "Where he could walk from the steps to the gate", "Where to plant more flowers", "Where the crew would race", "Follow the line he could see from the porch."],
      ],
    },
    {
      gaps: [["sticks", "cushions", "tags"], ["stride", "pause", "spin"], ["shrank", "grew", "moved"]],
      checks: [
        ["Why check the leaf pile before jumping?", "Hidden sticks could hurt someone", "The leaves needed more rain", "They wanted to sort the colours", "Think about what might be hidden in a pile."],
        ["What did the relay rule tell runners to do?", "Carry only what they could hold", "Jump before touching the leaves", "Fill a bag before taking a turn", "Read Mei’s rule for the relay."],
        ["What evidence showed the relay helped with cleanup?", "The pile shrank and the bin filled", "The chalk lines stayed bright", "Samir made a giant stride", "Look for two changes that happened as they played."],
      ],
    },
    {
      gaps: [["spring", "winter", "autumn", "back in spring"], ["base", "top", "side"], ["decide", "dig", "race"]],
      checks: [
        ["Why was a brown stem an unreliable clue?", "A plant could look dead and still grow back", "A brown stem always means an annual", "All the tags were brown too", "Compare what the stem looked like with what the tag said."],
        ["Why did Mei call Samir over?", "To show him how the tag guided her choice", "To ask him to pull every stem", "To tell him the bucket was full", "Read the last sentence."],
        ["Where did they look for the tag?", "At the base of the plant", "On the shed door", "At the end of the walk", "Find Mrs. Chen’s instruction."],
      ],
    },
    {
      gaps: [["cushions", "helmets", "rakes", "chairs and cushions"], ["passing", "parked", "broken"], ["dry", "cool", "hidden", "stay dry"]],
      checks: [
        ["Why did Malik check the space around the branches?", "To make sure the fabric didn’t press on the tree", "To make room for the cushions", "To tie the fabric directly to each branch", "Notice where the screen stands."],
        ["Why did Mei put cushions above the shed floor?", "To help keep them dry", "To let salty spray reach them", "To use them as steps", "Read what Mei wanted to protect them from."],
        ["What made the curbside tree need a screen?", "Its position near passing traffic", "Its colour in autumn", "Its height above the shed", "Think about where salty slush comes from."],
      ],
    },
    {
      gaps: [["returned", "packed", "hid"], ["checked", "empty", "torn", "box was checked"], ["when", "where", "why"]],
      checks: [
        ["What do the checked boxes tell Samir?", "The crew has finished the jobs on the list", "The games are about to begin", "They have a new yard to visit", "Remember what a tick meant at the porch meeting."],
        ["What did Malik expect he might lose?", "Either the ride or the games", "The tools or the map", "His turn at the first yard", "Listen to what he says at the playground."],
        ["What does Mei mean by ‘We only changed when’?", "They moved their fun plans to after the work", "They switched to a different park", "They decided only one child could play", "Compare the plan they wanted with the plan they used."],
      ],
    },
  ],
  AAAA: [
    {
      gaps: [["concealed", "marked", "levelled"], ["groceries", "branches", "cushions", "carrying my groceries"], ["assumed", "proved", "forgot"], ["height", "colour", "season"]],
      checks: [
        ["How did their first ideas differ?", "Malik thought of the whole yard. His neighbour wanted the walk clear.", "Malik chose the walk. His neighbour wanted the whole yard.", "Both wanted to repair the porch rail.", "Compare Malik’s first idea with the request."],
        ["What detail explains why the leaves were deceptive?", "They looked level where the paving changed height", "They were mostly maple leaves", "They reached the edge of the lawn", "Find the comparison to a carpet."],
        ["What would a clear path let Mr. D’Souza do on his own?", "Carry his groceries in", "Move patio chairs to the shed", "Cut back the garden plants", "Connect the request to what he planned to carry."],
        ["What did Malik’s question help the crew decide?", "Which part of the job was most urgent", "How long the whole cleanup would take", "Which route would win a race", "Think about what the neighbour’s answer narrowed down."],
      ],
    },
    {
      gaps: [["different", "identical", "finished"], ["addresses", "helmets", "rakes", "checked the addresses"], ["entrance", "kitchen", "garage"], ["request", "address", "schedule", "household’s request."]],
      checks: [
        ["Why wasn’t a map alone enough?", "It located the homes without listing their jobs", "It could only show the playground", "It marked the jobs but no streets", "Compare what the map showed with what the list added."],
        ["What did Samir circle?", "Tools they could use at both stops", "Addresses they had already visited", "Jobs that belonged to the neighbours", "Look for the detail about packing once."],
        ["How would the lists help at the end?", "They could check each yard against the owner’s requests", "They could decide whose yard had more leaves", "They could count how many tools they owned", "Think about how the lists would be used a second time."],
        ["What does ‘efficiently’ mean here?", "Without wasting trips or effort", "Without asking what to do", "Without using shared tools", "Connect the word to how they ordered the stops."],
      ],
    },
    {
      gaps: [["bucket", "basket", "cushion"], ["expecting", "following", "avoiding"], ["arranged", "cancelled", "forgotten"], ["together", "alone", "later"]],
      checks: [
        ["What made both original play plans hard to use?", "Neither accounted for the two visits", "Neither included enough riders", "Both required tools from the neighbours", "Compare the first plans with the commitments already made."],
        ["What part of Malik’s plan changed?", "The ride became the trip to the playground", "He chose to walk instead", "He rode before the visits", "Look at what the ride was used for."],
        ["Which suggestion keeps both play ideas?", "Ride to the playground once the work is done", "Ride while the others clean both yards", "Go to the playground and leave the bikes behind", "Check each plan against both preferences."],
        ["How can you tell the crew still took the work seriously?", "They planned to finish the yards and return the tools first", "They wanted to take their bikes to the park", "They each had a favourite thing to do", "Choose the detail that shows what came before play."],
      ],
    },
    {
      gaps: [["uneven", "smooth", "painted", "an uneven edge on the walk"], ["outward", "upward", "sideways"], ["smaller", "bigger", "drier"], ["narrow", "wet", "uneven", "walk narrow again"]],
      checks: [
        ["What did Mei use at first to judge where to begin?", "The amount of leaves", "The chance someone might trip", "The order of the house numbers", "Look at what caught her eye on the lawn."],
        ["How did Malik judge which spot mattered most?", "He considered the risk to people using the steps", "He picked the largest pile", "He chose the place nearest the bags", "Read why he points to the paving."],
        ["How did Samir avoid undoing the first job?", "He took the bag to the lawn and left the walk open", "He filled a bag on the bottom step", "He spread the wet leaves on the walk", "Think about where the bags belonged."],
        ["What would have stayed unsafe if they raked the lawn first?", "The uneven walk would still have been hidden", "The leaf bags would all have been filled", "The lawn would have been too dry", "Consider what work would have been delayed."],
      ],
    },
    {
      gaps: [["sticks", "bags", "tags"], ["flat", "sloped", "uneven"], ["transferred", "scattered", "counted"], ["rules", "colours", "scores"]],
      checks: [
        ["What did the crew check before Malik jumped?", "Whether the pile hid any sticks", "Whether the bin was full", "Whether the chalk could wash off", "Find their safety check at the beginning."],
        ["Why did Mei put the bin where everyone could reach it?", "So each runner could finish safely", "So only one child would take a turn", "So the leaves would stay in the maze", "Think about how the placement affected the relay."],
        ["Which evidence best shows the game helped with the work?", "The pile got smaller while the bin filled up", "The maze curved around the lawn", "The chalk course was on flat paving", "Choose evidence that measures what was cleared."],
        ["What would change if runners finished by the gate without a bin?", "The leaves would still have to be collected", "The leaves would already be stored", "The chalk course would get longer", "Think about the task the finish line helped complete."],
      ],
    },
    {
      gaps: [["dormant", "growing", "uprooted", "dormant perennials"], ["stem", "flower", "tag", "A brown stem alone"], ["bloom", "leaf", "bird"], ["label", "soil", "path", "both the label"]],
      checks: [
        ["What mistaken rule did Mei start with?", "Every brown stem could be treated as a spent flower", "Every plant with a tag should be kept", "Only annuals could be brown in autumn", "Look at what she did before reading the tags."],
        ["What did the tag show that the stem couldn’t?", "The plant would bloom again in spring", "The stem was brown", "The soil around it was wet", "Compare the picture on the tag with the plant’s current look."],
        ["What does ‘dormant’ mean in this scene?", "Resting for the season and able to grow again", "Dying because its roots are gone", "Blooming earlier than expected", "Follow what the tag says will happen next spring."],
        ["What made Mei’s final method more reliable?", "She checked the tag and Mrs. Chen’s list", "She judged each plant only by colour", "She removed the tallest stem first", "Notice the two sources of information she used."],
      ],
    },
    {
      gaps: [["stakes", "chairs", "bags", "placed stakes around"], ["burlap", "plastic", "cardboard"], ["protection", "storage", "pruning"], ["shelf", "lawn", "curb", "dry shelf"]],
      checks: [
        ["Why wrap the stakes with burlap?", "To catch spray while leaving air around the tree", "To tie the branches together", "To keep the patio cushions dry outside", "Follow where the fabric sits and what it blocks."],
        ["Which detail shows two jobs happened at the same time?", "The other pair stored the furniture meanwhile", "Mr. D’Souza put the stakes in first", "The cushions went above the chairs", "Look for the word that links simultaneous actions."],
        ["Why put the cushions on a shelf?", "To keep them dry and off the floor", "To screen the evergreen", "To make room for the burlap outside", "Look at the problem the patio items faced."],
        ["What did the two jobs have in common?", "Both protected something from winter weather", "Both involved covering the tree", "Both involved moving plants indoors", "Compare the purpose of the screen and the shed."],
      ],
    },
    {
      gaps: [["lists", "helmets", "bags"], ["relay", "meeting", "map", "The relay made"], ["competing", "finished", "matching"], ["responsibilities", "addresses", "arguments"]],
      checks: [
        ["Which detail shows they followed through before leaving?", "They checked the lists with both neighbours", "They talked about their favourite game", "They all had bike helmets", "Look at what they did immediately before the ride."],
        ["How was the relay different from the final bike ride?", "The relay made a chore into a game", "The relay got them to the park", "The relay decided whose plan won", "Think about when and why they played each one."],
        ["What changed when the friends put their plans in order?", "Helping and playing could both fit into the morning", "The neighbours stopped needing help", "Mei lost her chance to choose a game", "Compare the first disagreement with the result."],
        ["Which other plan uses the same lesson?", "Finish a class job together, then play a game on the way to recess", "Skip a promised job so a game can start sooner", "Let the fastest friend choose every task", "Find a plan that makes time for both a duty and some fun."],
      ],
    },
  ],
};

function gapInPassage(passage, [answer, first, second, phrase = answer], index) {
  const start = passage.indexOf(phrase);
  if (start === -1 || !phrase.includes(answer)) throw new Error(`Missing cloze text: ${phrase}`);
  const offset = start + phrase.indexOf(answer);
  const end = offset + answer.length;
  if ([passage[offset - 1], passage[end]].some((letter) => /\p{L}/u.test(letter ?? ""))) {
    throw new Error(`Cloze must replace a whole word: ${phrase}`);
  }
  return { start: offset, end, options: [answer, first, second], id: `cloze-${index + 2}` };
}

// The full text is shared by the story, read-back view and worksheet.
function formatPassage(chapter, replacement) {
  let at = 0;
  let text = "";
  for (const [index, gap] of chapter.gaps.entries()) {
    text += chapter.passage.slice(at, gap.start) + replacement(gap, index);
    at = gap.end;
  }
  return text + chapter.passage.slice(at);
}

for (const [level, entries] of Object.entries(stories)) {
  entries.forEach((chapter, chapterIndex) => {
    const [story, word, check] = chapter.tasks;
    const more = practice[level]?.[chapterIndex];
    const start = chapter.passage.indexOf("_");
    const original = { start, end: start + 1, options: story.options, id: "story" };
    chapter.gaps = [original, ...(more?.gaps ?? []).map((gap, i) => gapInPassage(chapter.passage, gap, i))]
      .sort((left, right) => left.start - right.start);
    const cloze = chapter.gaps.map((gap, i) => ({
      kind: "drag", section: 0, id: gap.id, skill: "Story cloze", options: gap.options, gapIndex: i,
    }));
    const extraChecks = (more?.checks ?? []).map(([text, answer, first, second, clue], i) => ({
      kind: "choice", section: 2, id: `check-${i + 2}`, skill: "Read and choose", text,
      options: [answer, first, second], clue,
    }));
    chapter.tasks = [...cloze, { ...word, section: 1, id: "word" },
      { ...check, section: 2, id: "check" }, ...extraChecks];
  });
}
