Presentation Slide Editor POC - Development Guide
Last Updated:
5 days ago at 11:30 am
📌 Introduction
We have previously implemented a POC for generating static slides using the presentation generator tool (previous brief). Now, we will be creating a POC for editable slides. You can choose to work on top of your previous implementation or create a stand alone editor POC.

The guide below provides step-by-step instructions to enhance the existing Presentation Slide Editor POC by integrating Tiptap (rich text editing), React DnD (drag-and-drop reordering), and Reveal.js (slide presentation rendering). The primary focus of this POC is to validate the feasibility of Tiptap as an editing solution for slides. Developers should follow the steps in the given order to ensure the correct implementation sequence.



Resources

Figma concept designs - This figma file contains concept designs on the "Final Designs" page that you can use for referencing. We do not expect the POC to match the concept designs completely. 

Tiptap Documentation – Next.js Integration Guide

https://tiptap.dev/docs/editor/getting-started/install/react

Covers setting up Tiptap in a React/Next.js project, using useEditor, and rendering content.

Joseph Dare, “How to add a rich text editor to Next.js using Tiptap” (Dev.to, 2024)

https://dev.to/josephdare/how-to-quickly-add-a-rich-text-editor-to-nextjs-using-tiptap

Walkthrough on installing and extending Tiptap in Next.js, adding toolbar actions, and custom styling.

Reveal.js Documentation – React Integration & API

https://revealjs.com

Explains slide structure, API usage, and methods like Reveal.initialize() and Reveal.sync().

Stack Overflow – “Add/Remove Slides from Reveal.js dynamically”

https://stackoverflow.com/questions/29065839/add-remove-slides-from-reveal-js-dynamically

Community discussion on inserting and removing slides dynamically in Reveal.js and updating slide navigation.

Cybermind Works Blog – “Notion-Like Editor with Real-Time Collaboration”

https://blog.cybermindworks.com/building-a-notion-like-editor-with-real-time-editing

Explains adding a presentation preview feature using Reveal.js inside a Tiptap-powered editor.

OpenReplay Blog – “Create Incredible Web Presentations with Reveal.js”

https://blog.openreplay.com/create-incredible-web-presentations-with-reveal-js

Guide on building a slide-based presentation system with Reveal.js, including adding images and backgrounds.

Tiptap Documentation – Output (HTML) and Performance Guides

https://tiptap.dev/docs/editor/output

https://tiptap.dev/docs/editor/extensions/performance

Covers extracting content from Tiptap as HTML and JSON, optimizing performance, and avoiding unnecessary re-renders.

ReactJS Girls Tech Talk – “Building talks with React (Reveal.js)” by Katie Walker

https://www.youtube.com/watch?v=kKpiwT9QitM

Video tutorial explaining how to use Reveal.js inside a React-based project.



🔹 Step 1: Expand Slide Layouts to Include Image Support
Objective
Enhance the current text-based slide layouts to include image-supported versions. This allows users to switch between text-only and image-supported layouts.

Requirements
Expand existing layouts to include image-supported versions: 

Title Slide with Image (Large title + optional subtitle + image section)

Title + Body + Image (Title + paragraph text + image)

Title + Bullets + Image (Title + bullet points + image)

Two-Column Layout + Image (Title + two text columns + image)

Users should be able to switch between text-only and image-supported layouts without losing their content.

If an image layout is selected, a placeholder image should be shown with an option to upload/replace it.

Implementation Steps
Review Existing Layouts

Identify the current slide layout components in the codebase.

Determine where modifications are required to introduce image sections.

Create New Layout Components

Develop React components for the new image-supported layouts.

Ensure that each layout component correctly handles both text and image content.

Modify Layout Selection Mechanism

Update the UI to allow switching between text-only and image-supported layouts.

Ensure that switching does not erase existing text content.

Store Image Data in Slide JSON

Extend the slide JSON structure to store image URLs.

{ "id": 3, "layout": "image-text", "content": { "title": "AI in Education", "image": "https://imgurl.com" } }
Resources
Tiptap React Integration Guide: https://tiptap.dev/docs/editor/getting-started/install/react

Tiptap Image Extension: https://tiptap.dev/docs/editor/extensions/image

🔹 Step 2: Implement Image Insertion and Management
Objective
Enable users to insert, replace, and remove images within slides that support image content.

Requirements
Allow users to upload images or provide image URLs.

Ensure uploaded images are displayed correctly within the slide.

Provide options for replacing or removing images.

Store images within the slide JSON structure.

Implementation Steps
Integrate Tiptap Image Extension

Install and configure the Image extension in Tiptap.

Ensure that images can be embedded into the editor.

Add Image Upload and URL Input UI

Implement an interface that allows users to upload an image or enter an image URL.

Validate the image source before saving.

Implement Image Replacement and Deletion

Add functionality to remove or replace an existing image.

Ensure changes reflect immediately within the editor.

Resources
Tiptap Image Extension: https://tiptap.dev/docs/editor/extensions/image

🔹 Step 3: Implement Core Editing Capabilities in Tiptap
Objective
Ensure users can edit slide content with rich text formatting and essential text manipulation features.

Requirements
Allow users to edit text directly within the slide content area.

Implement basic text formatting options: 

Bold, Italics, Underline, Strikethrough

Bullet Lists & Numbered Lists

Headings (H1, H2, H3)

Blockquotes

Enable undo/redo functionality.

Ensure content persists in JSON format.

Implementation Steps
Setup Tiptap Editor

Ensure the editor is correctly integrated with the existing slide components.

Configure the editor to accept and store content in JSON format.

Add Essential Formatting Extensions

Use StarterKit for core editing functionalities.

Include Bold, Italic, Underline, Strike, BulletList, OrderedList, Heading, and Blockquote extensions.

Implement Auto-Save for Edits

Ensure that any changes made to slide text are saved automatically in the state.

Resources
Tiptap Formatting Guide: https://tiptap.dev/docs/editor/extensions/starter-kit

🔹 Step 4: Implement Drag-and-Drop Slide Reordering
Objective
Allow users to reorder slides using drag-and-drop functionality.

Requirements
Users should be able to reorder slides in the sidebar.

Drag-and-drop functionality should provide smooth animations and feedback.

The updated slide order should be saved persistently.

Implementation Steps
Integrate React DnD

Set up dnd-kit in the project.

Configure the DndProvider and ensure it is applied to the sidebar component.

Make Slides Draggable

Use useDrag to make each slide in the sidebar draggable.

Ensure that dragging a slide provides appropriate visual feedback.

Define Drop Targets

Implement useDrop to specify valid drop zones for slides.

Handle the drop event to update the slide order.

Update State on Drop

Modify the Redux state (or component state) to reflect the new slide order.

Resources
React DnD Tutorial: https://react-dnd.github.io/react-dnd/docs/tutorial

🔹 Acceptance Criteria (Final Deliverables)
✅ Ability to create, edit, duplicate, and reorder slides using a drag-and-drop interface. 

✅ Ability to choose between text-only or image-supported layouts. 

✅ Ability to edit text content with rich formatting (bold, italic, lists, blockquotes) using Tiptap. 

✅ Ability to insert, replace, and remove images within slides using Tiptap’s Image extension. ✅ Ability to auto-save changes as users edit slide content. 

✅ Ability to navigate between slides and have a selected slide visually highlighted. 

✅ Ability to use keyboard shortcuts for text formatting (Bold, Italic, Undo, etc.).



For Mission 2, please focus on implementing the functionality from TipTap and Reveal.js, and use the following designs as your reference base:
Figma Presentation Editor Studio Concept Prototype [(https://www.figma.com/proto/6yrYEOa2Ds31qjXBvt8Hxt/Epic-2.16%3A-Presentation-Generator?node-id=1557-14361&t=aaLt42AaRNcxyOd7-1&scaling=min-zoom&content-scaling=fixed&page-id=1%3A3&starting-point-node-id=1557%3A14132)]
Figma Presentation Editor Studio Concept Design [https://www.figma.com/design/6yrYEOa2Ds31qjXBvt8Hxt/Epic-2.16%3A-Presentation-Generator?node-id=1557-14361&t=884TAvKOGiK4T5cE-1]