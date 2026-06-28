## Plan: Volunteering Plan Landing Page

### Overview
A welcoming, friendly landing page that presents a monthly volunteering plan. The page uses a split-view layout with a calendar grid on one side and a detailed event list on the other, styled in a soft blush & lavender color palette.

### Design Direction (User-Selected)
- **Palette**: Blush & Lavender — soft pinks, gentle purples, warm creams
- **Layout**: Split-screen — calendar grid + event details side by side
- **Typography**: Warm, readable serif/sans pairing (e.g., Lora + Nunito Sans) to be finalized
- **Energy**: Friendly, inviting, community-focused

### Implementation Steps

1. **Generate 3 Design Directions**
   - Use the locked palette, layout, and typography as hard constraints.
   - Vary composition, density, hierarchy, and motion register across the three.
   - Present rendered previews for the user to choose from.

2. **Build the Chosen Direction**
   - Create a new route: `src/routes/index.tsx` (home page).
   - Port the chosen prototype's DOM/composition to React exactly:
     - Split-screen layout with calendar grid and event list
     - Same hero alignment, section ordering, component counts
   - Apply design tokens (colors, fonts, spacing, radius) from the chosen direction into `src/styles.css`.
   - Load the chosen font families via `<link>` in `src/routes/__root.tsx` head.

3. **Content & Data**
   - Populate with sample monthly volunteering events (e.g., "Park Cleanup — March 8", "Food Bank — March 15", "Community Garden — March 22").
   - Each event card shows: date, title, short description, time, location.
   - Calendar days with events get a visual indicator.

4. **Interactivity**
   - Clicking a calendar day or event highlights/scrolls to the corresponding detail.
   - Smooth transitions and hover states on cards.
   - Responsive behavior: stack vertically on mobile.

5. **SEO & Metadata**
   - Update `head()` in `src/routes/index.tsx` with a descriptive title and meta description for the volunteering plan.

6. **Polish**
   - Verify responsive layout across desktop, tablet, and mobile.
   - Check contrast and accessibility.
   - Remove any placeholder content or generic copy.

### Technical Details
- **Stack**: TanStack Start v1, React 19, Tailwind v4, shadcn/ui
- **New Dependencies**: Likely `date-fns` for calendar logic; font-loading via `<link>` tags in root route head.
- **Files to Modify/Create**:
  - `src/routes/index.tsx` — main landing page
  - `src/styles.css` — add custom palette tokens
  - `src/routes/__root.tsx` — add font `<link>` tags and update meta
- **No Backend**: This is a static presentation landing page; no database or auth needed.

### Acceptance Criteria
- [ ] Page renders a friendly, visually appealing volunteering plan
- [ ] Split view shows calendar and event list
- [ ] Events are clearly readable with date, title, description, time, location
- [ ] Fully responsive (mobile, tablet, desktop)
- [ ] No placeholder content remains
- [ ] SEO metadata is present and accurate