---
name: ห้องเรียนเครือข่าย — สัปดาห์ที่ 1
description: A classroom route map on warm paper, forest ink and lime station markers.
colors:
  paper: "#f5f3eb"
  white: "#fffef9"
  ink: "#163c39"
  muted: "#526961"
  line: "#d5dcd0"
  lime: "#d5ee72"
  soft: "#e9eddf"
  focus: "#ae501c"
  ink-hover: "#2f5750"
  terminal: "#15332f"
  terminal-text: "#ecf2e6"
typography:
  display:
    fontFamily: "Thai, sans-serif"
    fontSize: "clamp(32px, 3.1vw, 52px)"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "-.03em"
  headline:
    fontFamily: "Thai, sans-serif"
    fontSize: "25px"
    fontWeight: 700
    lineHeight: 1.65
    letterSpacing: "-.015em"
  body:
    fontFamily: "Thai, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 2
  label:
    fontFamily: "Thai, sans-serif"
    fontSize: "14px"
    fontWeight: 600
  command:
    fontFamily: "monospace, Thai"
    fontSize: "14px"
    lineHeight: 1.8
rounded:
  control: "7px"
  field: "8px"
  surface: "14px"
  station: "50%"
spacing:
  control-gap: "9px"
  mobile-gutter: "20px"
  medium-gutter: "30px"
  desktop-gutter: "48px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "8px 15px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
  button-subtle:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "8px 15px"
  answer-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "18px"
  chapter-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    padding: "10px 12px"
  progress-check:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    padding: "10px 14px"
  layer-surface:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "38px 38px 32px"
---

# Design System: ห้องเรียนเครือข่าย

## Overview

**Creative North Star: "The Classroom Route Map"**

A classroom route map on warm paper: forest ink gives Thai explanations a calm, readable structure, while lime marks connections and progress. The established implementation is code-first, with precise vector stations and self-hosted Noto Sans Thai.

The system supports teacher-paced exploration and substantial reading. Broad, flat surfaces and quiet dividers keep diagrams, explanations and controls legible without decorative imagery.

**Key Characteristics:**
- Warm paper and forest ink
- Lime station and progress markers
- Generous Thai line height
- Flat surfaces and exact vector diagrams

## Colors

### Primary
Forest ink (`ink`) carries headings, reading text, selected navigation and primary actions. Lime (`lime`) identifies highlighted words, active stations and completed work. Darker ink hover preserves primary action contrast.

### Neutral
Warm paper (`paper`) is the page; near-white (`white`) supports tables and writing fields. Soft sage (`soft`) groups interactive explanations. Muted forest (`muted`) supports secondary labels; the pale divider (`line`) organizes reading without shadows. The terminal uses its own dark forest and pale text. Rust (`focus`) is reserved for visible keyboard focus.

**The Station Rule.** Lime signals emphasis or progress; retain words, shapes or accessible state information alongside it.

## Typography

The locally served Noto Sans Thai files use the CSS family alias `Thai`, with a sans-serif fallback. Regular is weight 400; the bold font file serves weights 600–800. Monospace is reserved for commands and output, with Thai fallback where needed.

Display headings use the responsive frontmatter role; article headings use the headline role. Article text uses the body role and a maximum reading measure of 75ch. Supporting introductions use 17px with 1.9 line height; small navigation and metadata use 11–14px. Keep Thai leading generous rather than forcing compact Latin-style vertical rhythm.

## Layout

Desktop uses an 88px sticky top bar, a fixed 265px chapter rail and a main area with 48px side gutters. Articles center within 850px; the main area is capped at 1800px. The opening layout has two columns (1.2fr / 1fr); workspaces use paired controls and detail surfaces.

At 1200px the rail narrows to 235px and gutters to 30px. At 960px it becomes a 275px off-canvas drawer with a scrim; closed navigation is hidden from focus. At 640px the bar is 76px, gutters are 20px and paired workspaces stack. Tabs scroll horizontally, tables retain horizontal scrolling, and OSI choices become two columns. At 1600px gutters grow to 70px.

Presentation mode hides the rail by default, centers content within 1350px, expands articles to 1050px and increases body type to 22px. Large-text mode also increases body type. On narrow screens both modes use 20px body text. Print removes navigation and teaching controls.

## Elevation & Depth

No box shadows are used. Tonal surfaces, fine borders and spacing establish grouping; only the mobile drawer uses a translucent forest scrim. Maintain this flat paper character.

## Shapes

Controls have gently rounded corners; fields and answer reveals are slightly softer, and teaching surfaces use the larger surface radius. Stations, the brand mark and progress dots are circular. Thin rails connect circular nodes; numbers and labels remain outside the station icon itself.

## Components

- **Buttons:** primary uses forest ink with pale text; subtle uses a transparent fill and pale border. Both have 42px minimum height and the control token spacing. Hover changes color over 150ms. Disabled controls use 0.35 opacity. Text and icon-only variants retain the same focus treatment.
- **Fields:** the answer textarea is near-white, bordered, vertically resizable and at least 210px high. Scenario selection is a native select. Command entry sits within the dark terminal and always accompanies a simulation label.
- **Navigation:** the chapter rail uses compact numbered rows and a solid ink active row. Learning modes use an underline and stronger type. Mobile presentation controls keep accessible names even when visible labels are hidden.
- **Progress:** read/review toggles use lime when checked. Question-index buttons combine selected ink, completed lime and a completion dot. State attributes and Thai labels communicate these distinctions.
- **Teaching surfaces:** layer detail, route journey and suggested answers use soft sage fills without elevation. The layer detail includes a large pale numeral; it is decorative and hidden from assistive technology.
- **Route map:** three circular stations connect by a thin horizontal rail with a moving packet dot. Packet movement takes one second with cubic-bezier(.16,1,.3,1); teacher-controlled steps and optional five-second playback pace the explanation. Reduced-motion preference disables transitions and smooth scrolling.

All interactive elements use a 3px rust focus outline with 4px offset. Preserve this treatment on generated component states.

## Do's and Don'ts

- Do preserve Thai line height and generous reading measure.
- Do pair state color with text, borders, numbers or accessible state attributes.
- Do keep route diagrams as editable code and inline vectors.
- Do retain visible keyboard focus and reduced-motion support.
- Don't replace full explanations with decorative summaries.
- Don't remove the simulation label from command output.
- Don't add elevated card stacks to the flat paper system.
