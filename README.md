# Games & Prizes – St. Luke's ElderCare Clementi (GEN2062Y)

A static website that volunteers open on their laptops to run two games:

- **Trivia Quiz**: 50 multiple-choice questions in English, 中文 and Bahasa Melayu, each with a reveal button and a fun fact. After revealing the answer, the volunteer can open the prize wheel.
- **Roll the Bottle**: a full-screen prize wheel that stays open for the whole game. Press **SPIN** whenever a senior's bottle stops on the target.

The wheel gives **Tissues**, **Wet Wipes** or **Try Again**. The odds are set from the head count and the prize stock, so the prizes are expected to last the whole activity.

## How the odds are worked out

```
rounds         = game time ÷ minutes per round          (50 ÷ 1 = 50)
expected spins = seniors × rounds × success chance      (50 × 50 × 33% = 825)
usable prizes  = stock × (1 − reserve %)                (180 × 90% = 162 tissues, 160 × 90% = 144 wipes)
P(tissues)     = usable tissues ÷ expected spins        (19.64%)
P(wet wipes)   = usable wipes ÷ expected spins          (17.45%)
P(try again)   = the rest                               (62.91%)
```

If there are more prizes than expected spins, every spin wins, and the prize type is split in proportion to stock.

The wheel's coloured segments are only for show. The result is picked using the exact odds above.

## On the day

1. Open the site and go to **Organiser setup** (link at the bottom of the home page).
2. Enter the real number of seniors, tissues and wet wipes. The odds and the "expected left at end" figures update straight away.
3. Press **Copy link** and send it to all volunteers. Opening the link sets those odds on their laptop, and they stay saved after a reload.
4. Volunteers should check that the home page shows "✓ Using the organiser's settings link" with the right numbers.
5. If prizes are running out faster or slower than expected, enter the **minutes left** and **prizes left**, then send out the new link.

Each laptop keeps a small count of the spins and prizes given out on it, shown under the wheel. It can be reset.

### Keyboard shortcuts

- Trivia: **←/→** previous/next question, **Space/Enter** reveal the answer, **S** open the wheel (after revealing)
- Wheel: **Space/Enter** spin, **Esc** close the wheel pop-up

## Intro slides

Six slides to open the activity are at **`/slides`** (for example `https://<your-site>.vercel.app/slides`). Send that link to the centre and open it on the projector.

- **Next slide:** → / Space / Page Down. A presentation clicker works too, and so does clicking the slide.
- **Previous slide:** ← / Page Up
- **Full screen:** **F**, or the ⛶ button
- **Language:** EN / 中文 / BM in the bottom bar. The controls fade out when the mouse is still.
- **Sample question:** the trivia slide shows its answer on the first "next" press.
- **Link to a slide:** add `#3` and so on to the address.

## Run locally

There is no build step. Serve the folder with any static server:

```bash
python3 -m http.server 5173
```

Then open http://localhost:5173.

## Deploy to Vercel

Either run `vercel` in this folder, or push it to GitHub and import the repo in the Vercel dashboard (Framework preset: **Other**, no build command, output directory: the root). No configuration is needed.

## Files

- `index.html`: page shell
- `src/config.js`: default settings, share-link parameters, odds calculation
- `src/questions.js`: the 50 trivia questions (edit here; please have a native speaker check the 中文 and BM text)
- `src/i18n.js`: interface text in the three languages
- `src/wheel.js`: the prize wheel
- `src/screens/`: the home, trivia, wheel and setup screens
- `slides/index.html`, `src/slides.js`, `src/slides.css`: the intro slides at `/slides`
