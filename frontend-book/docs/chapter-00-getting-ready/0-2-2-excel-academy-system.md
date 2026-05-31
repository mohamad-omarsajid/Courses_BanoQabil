---
lesson_id: frontend.ch00.l02b
title: "0.2.2 Assignment: Academy management system in Excel"
chapter: 0
order: 2.2
estimated_minutes: 90
prerequisites:
  - frontend.ch00.l02a
---

# 0.2.2 Assignment: Build an academy management system in Excel

Spreadsheets are not just for accountants. Any time you have a list of people, a set of numbers, and a question you want answered automatically, a spreadsheet is the right tool. In this assignment you build a small but real system: a workbook that tracks students, records daily attendance, calculates percentages, flags students who are below the limit, and shows a results summary with pass or fail.

When you finish, you will have a working system that a real Bano Qabil class could actually use. More importantly, you will understand formulas from the inside, not just as things you copy from Google.

By the end you will have:

- A multi-sheet Excel or Google Sheets workbook with three linked sheets
- Attendance tracking with automatic percentage calculation
- IF conditions and conditional formatting to highlight problems
- A results sheet with marks, percentages, and pass or fail

Open [Google Sheets](https://sheets.google.com) or Excel (at [office.com](https://www.office.com)) now and keep it open as you follow along.

---

## Step 1: Plan the workbook

Before you touch a cell, think about the structure. A workbook (Roman Urdu: ek file jis mein kai sheets hoti hain, jaise ek kitaab mein kai safhe) is a single file that can hold many sheets. Each sheet is a tab at the bottom.

You will build three sheets:

| Sheet name | What it holds |
| --- | --- |
| `Students` | The master list: roll number and student name |
| `Attendance` | Daily attendance for one month: dates across the top, students down the side |
| `Summary` | Each student's attendance percentage, marks, total, percentage, and pass or fail |

Right-click each tab at the bottom of your spreadsheet to rename it. Name them exactly as shown: `Students`, `Attendance`, `Summary`. Using consistent names matters because formulas will reference them by name.

---

## Step 2: Build the Students sheet

Click the `Students` tab. Set up two columns:

| Cell | Type this |
| --- | --- |
| `A1` | `Roll No` |
| `B1` | `Name` |

Then fill in ten students. It is fine to use made-up names for practice:

| A | B |
| --- | --- |
| 1 | Ali Hassan |
| 2 | Fatima Tariq |
| 3 | Usman Raza |
| 4 | Zainab Bibi |
| 5 | Hamza Malik |
| 6 | Amna Khalid |
| 7 | Bilal Ahmed |
| 8 | Saira Noor |
| 9 | Tariq Mehmood |
| 10 | Hina Zafar |

Put roll numbers in column A (rows 2 to 11) and names in column B (rows 2 to 11). Row 1 is always the header row.

---

## Step 3: Build the Attendance sheet

Click the `Attendance` tab.

### Set up the layout

- Cell `A1`: type `Roll No`
- Cell `B1`: type `Name`
- Starting from `C1`, type the dates of the month, one per column. For a 20-day class month, you would have `C1` through `V1`. You can just type numbers 1 through 20 for practice.
- After the last date column, add two more columns with headers:
  - `Present` (how many days the student attended)
  - `Total` (how many class days there were)
  - `Attendance %` (the percentage)
  - `Status` (whether they are above or below 75%)

A completed header row for a 5-day example looks like:

| A | B | C | D | E | F | G | H | I | J |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Roll No | Name | 1 | 2 | 3 | 4 | 5 | Present | Total | Attendance % | Status |

For a real month, add more date columns between F and G.

### Fill in the roll numbers and names

In `A2` through `A11`, type the numbers 1 to 10. In `B2` through `B11`, type the same names you put in the Students sheet. (You will learn to pull them automatically from `Students` in Step 6.)

### Mark attendance

In each date column, for each student, type either `P` (present) or `A` (absent). Use capitals. This is the raw data the formulas will read.

For practice, mark a mix: some students mostly present, and one or two with a lot of absences. That way the conditional formatting in Step 5 will have something to highlight.

---

## Step 4: Count attendance and compute the percentage

Now the formulas. Stay on the `Attendance` sheet.

### Count present days

In the `Present` column (let us say column H, assuming you have dates in columns C through G for a 5-day example), click cell `H2` and type:

```
=COUNTIF(C2:G2,"P")
```

What this does: `COUNTIF` goes through the range `C2:G2` and counts every cell that contains exactly `"P"`. The result is the number of days that student was present.

Copy this formula down from `H2` to `H11` by clicking `H2`, then dragging the small square at the bottom-right of the cell down through `H11`. The formula adjusts automatically for each row: `H3` becomes `=COUNTIF(C3:G3,"P")`, and so on.

### Set the total days

In the `Total` column (column I), type the total number of class days in `I2`. For a 5-day example, type `5`. Then copy this number down through `I11`. (In a real sheet you could use `=COUNTA(C1:G1)` to count the date headers automatically, but a plain number is fine for now.)

### Compute the percentage

In the `Attendance %` column (column J), click cell `J2` and type:

```
=H2/I2
```

This divides present days by total days. The result is a decimal, like `0.8`. To show it as a percentage, select the `J` column, then click the `%` button in the toolbar (or press Ctrl+Shift+5 on Windows). Now `0.8` shows as `80%`.

Copy `J2` down through `J11`.

Here is a summary of the three formulas and what they do:

| Formula | What it does |
| --- | --- |
| `=COUNTIF(C2:G2,"P")` | Counts how many cells in that row contain the letter P |
| `=H2/I2` | Divides present days by total days to get the attendance fraction |
| `=H2/I2` formatted as `%` | Displays that fraction as a percentage, like 80% |

---

## Step 5: Flag low attendance with IF and conditional formatting

A percentage number is useful. A warning is even more useful because it draws the eye.

### Add an IF formula for the Status column

In the `Status` column (column K), click cell `K2` and type:

```
=IF(J2<0.75,"Short","OK")
```

What this does: `IF` checks whether `J2` is less than `0.75` (which is 75%). If yes, it writes the word `Short`. If no, it writes `OK`.

Copy this formula down through `K11`.

| Formula | What it does |
| --- | --- |
| `=IF(J2<0.75,"Short","OK")` | Writes "Short" if attendance is below 75%, otherwise writes "OK" |

### Add conditional formatting to colour low attendance

Conditional formatting (Roman Urdu: agar koi condition poori ho toh cell ka rang badal do) colours a cell automatically based on its value. You will colour any `Attendance %` cell red when it is below 75%.

**In Google Sheets:**

1. Select the range `J2:J11` (the Attendance % column).
2. Go to **Format > Conditional formatting**.
3. Under "Format cells if", choose "Less than".
4. In the value box, type `0.75`.
5. Under "Formatting style", click the fill colour and choose red.
6. Click Done.

**In Excel:**

1. Select `J2:J11`.
2. Go to **Home > Conditional Formatting > Highlight Cells Rules > Less Than**.
3. Type `0.75` and choose "Light Red Fill" or pick a custom red.
4. Click OK.

Now any student below 75% attendance will have a red cell that jumps out immediately.

---

## Step 6: Pull data from another sheet

You typed the student names again in the Attendance sheet. In a real system you want to pull them from the Students sheet automatically. That way if a name changes, you only fix it in one place.

Click the `Attendance` sheet, cell `B2`. Delete what is there and type:

```
=Students!B2
```

The `!` means "look in this other sheet". `Students!B2` means "cell B2 of the Students sheet". Copy this formula down through `B11`. Now the names in the Attendance sheet come directly from the Students sheet.

| Formula pattern | What it does |
| --- | --- |
| `=Students!B2` | Reads the value from cell B2 on the Students sheet |
| `=Students!A2` | Reads the roll number from cell A2 on the Students sheet |

You can use the same pattern to pull the roll numbers: in `A2` of the Attendance sheet, type `=Students!A2` and copy it down.

---

## Step 7: Build the Summary sheet

Click the `Summary` tab. This sheet brings together attendance and marks in one view.

### Set up the headers

| A | B | C | D | E | F | G |
| --- | --- | --- | --- | --- | --- | --- |
| Roll No | Name | Attendance % | Marks | Total Marks | Result % | Pass / Fail |

### Pull attendance data

In `A2`, type `=Students!A2` and copy it down through `A11` for roll numbers.
In `B2`, type `=Students!B2` and copy it down for names.
In `C2`, type `=Attendance!J2` and copy it down. This pulls the attendance percentage straight from the Attendance sheet.

### Add marks

In column D (`Marks`), type the marks for each student manually. Use numbers out of 100.
In column E (`Total Marks`), type `100` in `E2` and copy it down. (Or type any maximum you use.)

### Calculate result percentage and pass or fail

In `F2`, type:

```
=D2/E2
```

Format column F as a percentage the same way you did before (select the column, click `%`).

Copy `F2` down through `F11`.

In `G2`, type:

```
=IF(F2>=0.5,"Pass","Fail")
```

This checks whether the result percentage is 50% or more. If yes, it writes `Pass`. If no, it writes `Fail`.

Copy `G2` down through `G11`.

| Formula | What it does |
| --- | --- |
| `=Attendance!J2` | Pulls the attendance percentage from the Attendance sheet |
| `=D2/E2` | Divides marks by total marks to get the result percentage |
| `=IF(F2>=0.5,"Pass","Fail")` | Writes "Pass" if the student scored 50% or more, otherwise "Fail" |

Your Summary sheet now updates automatically whenever you change a mark in column D or an attendance entry in the Attendance sheet. That is the real power of a well-built spreadsheet.

??? note urdu "اردو میں مزید وضاحت"
    یہ سسٹم تین حصوں میں کام کرتا ہے: Students شیٹ میں طلبا کی فہرست ہے، Attendance شیٹ میں روزانہ حاضری ہے، اور Summary شیٹ میں سب کچھ ایک جگہ دکھتا ہے۔ COUNTIF فارمولا "P" گنتا ہے، IF فارمولا شرط لگاتا ہے جیسے "اگر 75 فیصد سے کم ہو تو Short لکھو"، اور شیٹ کا حوالہ جیسے =Students!B2 ایک شیٹ سے دوسری شیٹ میں ڈیٹا لاتا ہے۔ جب آپ ایک جگہ نمبر بدلتے ہیں تو سب کچھ خود بخود اپڈیٹ ہو جاتا ہے، یہی اسپریڈشیٹ کی اصل طاقت ہے۔

---

## Done when

Go through this checklist before moving on. Each item should be genuinely complete.

- [ ] My workbook has three named sheets: Students, Attendance, Summary
- [ ] The Students sheet has roll numbers and names in columns A and B
- [ ] The Attendance sheet has dates across the top and students down the side
- [ ] Each student has a mix of P and A entries in the date columns
- [ ] The Present column uses `=COUNTIF(range,"P")` and shows a correct count
- [ ] The Attendance % column divides present by total and is formatted as a percentage
- [ ] The Status column uses `=IF` to write "Short" for below 75% and "OK" otherwise
- [ ] Conditional formatting colours any Attendance % cell below 75% in red
- [ ] The Attendance sheet pulls names from the Students sheet using `=Students!B2`
- [ ] The Summary sheet pulls attendance percentages from the Attendance sheet using `=Attendance!J2`
- [ ] The Summary sheet has marks, result percentage, and a Pass/Fail column using `=IF`
- [ ] Changing one attendance entry in the Attendance sheet updates the Summary sheet

---

## What is next

You have built a real, working multi-sheet system. You have used COUNTIF, IF, conditional formatting, and cross-sheet references. These are the same ideas that power far bigger systems used by businesses and schools every day. In the next lesson you will meet a study tool that will help you throughout this whole course: using AI tools like ChatGPT and Claude to learn, without letting them do all the thinking for you.

[Next lesson: 0.3 Using AI to learn &rarr;](0-3-using-ai-to-learn.md){ .next-lesson }

---

<!-- The Mark Complete button is injected here automatically by the site template. -->

*[workbook]: A spreadsheet file containing one or more sheets. (Roman Urdu: ek file jis mein kai sheets hoti hain)
*[spreadsheet]: A grid of cells for numbers and calculations, like Google Sheets or Excel. (Roman Urdu: ek table jis mein numbers aur hisaab hota hai)
*[COUNTIF]: A spreadsheet formula that counts cells matching a condition. (Roman Urdu: ek formula jo kisi condition se milne wale cells giinta hai)
*[conditional formatting]: Automatic cell colouring based on the cell's value. (Roman Urdu: value ke hisaab se cell ka rang badalna)
