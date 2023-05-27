import './style.scss';
import opensound from './assets/audio/opensound.mp3';
import flagsound from './assets/audio/flagsound.mp3';
import kitten2sound from './assets/audio/kitten2sound.mp3';
import loosesound from './assets/audio/loosesound.mp3';
import winsound from './assets/audio/winsound.mp3';
import blackkitten from './assets/icons/blackkitten.png';
import blindkitten from './assets/icons/blindkitten.png';
import blacktheme from './assets/images/blacktheme.jpg';
import whitetheme from './assets/images/whitetheme.jpg';
// console.log(blacktheme);
import blindpaw from './assets/icons/blindpaw.png';
import blackpaw from './assets/icons/blackpaw.png';
import closeBlack from './assets/icons/closeBlack.png';
import closeWhite from './assets/icons/closeWhite.png';
// console.log(closeWhite);
import Georgia from './assets/fonts/Gelasio-Regular.ttf';


class MineSweeperGame {
  constructor(rows = 10, columms = 10, mines = 10) {
    this.rows = rows;
    this.columms = columms;
    this.mines = mines;
    this.numberOfCells = rows * columms;
    this.restMines = mines;
    this.flags = mines;
    this.clickscount = 0;
    this.productiveClicksCount = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.timerIdForStop;
    this.cell;
    this.cellWithOutBomb;
    this.cellUnderClick;
    this.currentCell;
    this.markForRangeEvent = 0;
    this.winGame = 0;
    this.minesField = new Array(this.rows);
    this.counterOfMarkedKittens = 0;
    this.counterForRestCellsWithOutBombs = 0;
    this.audioForOpenCell = new Audio(opensound);
    this.audioForFlagCell = new Audio(flagsound);
    this.audioForMineCell = new Audio(kitten2sound);
    this.audioForGameOver = new Audio(loosesound);
    this.audioForWin = new Audio(winsound);
    // console.log(this.audioForOpenCell);
    this.mainContainer = document.createElement("div");
    this.toolsScoreContainer = document.createElement("div");
    this.durationAndGameContainer = document.createElement("div");
    this.title = document.createElement("div");
    this.text = document.createElement("div");
    this.score = document.createElement("div");
    this.durationOnGame = document.createElement("div");
    this.game = document.createElement("div");
    this.counterOfFlags = document.createElement("div");
    this.counterOfMines = document.createElement("div");
    this.counterOfTime = document.createElement("div");
    this.numberOfLeftClicks = document.createElement("div");
    //result button
    this.resultWindow = document.createElement("div");
    this.resultOKButton = document.createElement("div");
    this.resultText = document.createElement("div");
    //settings
    this.buttonStartNewGame = document.createElement("div");
    this.tools = document.createElement("div");
    this.settigsTitle = document.createElement("div");
    this.settingsCommonBlock = document.createElement("div");
    this.settingsCloseIcon = document.createElement("div");
    this.settingsCloseIconImage = document.createElement("img");
    this.sizeOfGame = document.createElement("div");
    this.sizeOfGameTitle = document.createElement("div");
    this.sizeForm = document.createElement("form");
    this.sizeEasyTitle = document.createElement("label");
    this.sizeEasy = document.createElement("input");
    this.sizeMediumTitle = document.createElement("label");
    this.sizeMedium = document.createElement("input");
    this.sizeHardTitle = document.createElement("label");
    this.sizeHard = document.createElement("input");
    this.numberOfMines = document.createElement("div");
    this.numberOfMinesTitle = document.createElement("div");
    this.numberOfMinesInput = document.createElement("input");
    this.theme = document.createElement("div");
    this.themeTitle = document.createElement("div");
    this.themeForm = document.createElement("form");
    this.whiteThemeTitle = document.createElement("label");
    this.whiteThemeInput = document.createElement("input");
    this.blackThemeTitle = document.createElement("label");
    this.blackThemeInput = document.createElement("input");
    this.sound = document.createElement("div");
    this.soundTitle = document.createElement("div");
    this.soundForm = document.createElement("form");
    this.onSoundTitle = document.createElement("label");
    this.onSoundInput = document.createElement("input");
    this.offSoundTitle = document.createElement("label");
    this.offSoundInput = document.createElement("input");
    // results block
    this.resultsBlock = document.createElement("div");
    this.resultsCloseIcon = document.createElement("div");
    this.resultsCloseIconImage = document.createElement("img");
    this.resultsTitle = document.createElement("div");
    this.resultsTable = document.createElement("div");
    this.resultsTableLine = document.createElement("div");
    this.resultsItemName = document.createElement("div");
    this.resultsItemClicks = document.createElement("div");
    this.resultsItemDuration = document.createElement("div");
    // results name
    this.resultsName;
    // results Input
    this.resultsInputBlock = document.createElement("div");
    this.resultsInputBlockTitle = document.createElement("div");
    this.resultsInputBlockInput = document.createElement("input");
    this.resultsInputBlockSubmit = document.createElement("div");
    // savegame
    this.resultsForSaveIfUserCloseOrReloadWindow = new Object();
    this.gameForSaveIfUserCloseOrReloadWindow = new Object();
    this.resultsFromSave = new Object();
    this.gameFromSave = new Object();
    this.arrayForNames = new Array();
    this.arrayForClicks = new Array();
    this.arrayForTime = [];
    this.arrayOfClasesOfCells = [];
    // save button
    this.saveButton = document.createElement("div");
    // this.loadEvent = 0;
    // load window
    this.loadWindow = document.createElement("div");
    this.loadTitle = document.createElement("div");
    this.loadBlockForButtons = document.createElement("div");
    this.loadYesButton = document.createElement("div");
    this.loadNoButton = document.createElement("div");
  }

  receiveMineSweeperGame() {
    this.mainContainer.classList.add("container");
    this.toolsScoreContainer.classList.add("container_tools");
    this.title.classList.add("title_block");
    this.title.textContent = "Kitten's MineSweeper";
    this.text.classList.add('text_block');
    this.text.textContent = `Dear, friend! You need to find all dreaming kittens and mark them. Be careful, don't wake up them`
    this.numberOfLeftClicks.classList.add("number_clicks");
    this.numberOfLeftClicks.textContent = `Number of movements: ${this.productiveClicksCount}`;
    this.counterOfMines.classList.add("counter_mines");
    this.counterOfMines.textContent = `Number of hidden dreaming cats: 0`;
    this.counterOfFlags.classList.add("counter_paws");
    this.counterOfFlags.textContent = `Number of paws: 0`;
    this.counterOfTime.classList.add("counter_times");
    this.counterOfTime.textContent = `Duration: 00:00 seconds`;
    this.durationAndGameContainer.classList.add("container_game");
    this.durationOnGame.classList.add("duration_block");
    this.game.classList.add("game_block");
    this.game.style.gridTemplateColumns = `repeat(${this.columms}, auto)`;
    this.game.style.gridTemplateRows = `repeat(${this.rows}, auto)`;
    document.body.prepend(this.mainContainer);
    this.mainContainer.append(this.durationAndGameContainer);
    this.mainContainer.append(this.toolsScoreContainer);
    this.toolsScoreContainer.append(this.title);
    this.toolsScoreContainer.append(this.text);
    this.durationAndGameContainer.append(this.durationOnGame);
    this.durationOnGame.append(this.counterOfTime);
    this.durationOnGame.append(this.numberOfLeftClicks);
    this.durationOnGame.append(this.counterOfMines);
    this.durationOnGame.append(this.counterOfFlags);
    this.durationAndGameContainer.append(this.game);
    this.receiveStartGameButton();
    this.receiveSaveGameButton();
    this.receiveSettingsBlock();
    this.receiveResultsBlock();
  }

  receiveStartGameButton() {
    this.buttonStartNewGame.classList.add("start_button");
    this.buttonStartNewGame.textContent = "Start new game";
    this.toolsScoreContainer.append(this.buttonStartNewGame);
  }

  receiveSaveGameButton() {
    this.saveButton.classList.add("save_button");
    this.saveButton.textContent = "Save game";
    this.toolsScoreContainer.append(this.saveButton);
  }

  receiveSettingsBlock() {
    this.tools.classList.add("tools_block");
    this.toolsScoreContainer.append(this.tools);
    this.settigsTitle.classList.add("tools_title");
    this.settigsTitle.textContent = "Settings";
    this.tools.append(this.settigsTitle);
    this.receiveSettigsWindow();
  }

  receiveSettigsWindow() {
    this.settingsCommonBlock.classList.add("settings_container");
    this.sizeOfGame.classList.add("size_block");
    this.sizeOfGameTitle.classList.add("size_title");
    this.sizeOfGameTitle.textContent = `Size of game:`;
    this.theme.classList.add("theme_block");
    this.settingsCommonBlock.append(this.theme);
    this.sound.classList.add("sound_block");
    this.settingsCommonBlock.append(this.sound);
    this.themeTitle.classList.add("theme_title");
    this.themeTitle.textContent = "Theme of game:";
    this.theme.append(this.themeTitle);
    this.themeForm.classList.add("theme_form");
    this.theme.append(this.themeForm);
    this.blackThemeTitle.textContent = "dark style";
    this.blackThemeTitle.setAttribute("for", "black");
    this.blackThemeInput.setAttribute("id", "black");
    this.blackThemeInput.setAttribute("type", "radio");
    this.blackThemeInput.setAttribute("name", "theme");
    this.blackThemeInput.classList.add("input_radio");
    this.blackThemeInput.checked = true;
    this.themeForm.append(this.blackThemeInput);
    this.themeForm.append(this.blackThemeTitle);
    this.whiteThemeTitle.textContent = "light style";
    this.whiteThemeTitle.setAttribute("for", "white");
    this.whiteThemeInput.setAttribute("id", "white");
    this.whiteThemeInput.setAttribute("type", "radio");
    this.whiteThemeInput.setAttribute("name", "theme");
    this.whiteThemeInput.classList.add("input_radio");
    this.themeForm.append(this.whiteThemeInput);
    this.themeForm.append(this.whiteThemeTitle);
    this.soundTitle.classList.add("sound_title");
    this.soundTitle.textContent = "Sound:";
    this.sound.append(this.soundTitle);
    this.soundForm.classList.add("sound_form");
    this.sound.append(this.soundForm);
    this.onSoundTitle.textContent = "on";
    this.onSoundTitle.setAttribute("for", "on");
    this.onSoundInput.setAttribute("id", "on");
    this.onSoundInput.setAttribute("type", "radio");
    this.onSoundInput.setAttribute("name", "sound");
    this.onSoundInput.classList.add("input_radio");
    this.onSoundInput.checked = true;
    this.soundForm.append(this.onSoundInput);
    this.soundForm.append(this.onSoundTitle);
    this.offSoundTitle.textContent = "off";
    this.offSoundTitle.setAttribute("for", "off");
    this.offSoundInput.setAttribute("id", "off");
    this.offSoundInput.setAttribute("type", "radio");
    this.offSoundInput.setAttribute("name", "sound");
    this.offSoundInput.classList.add("input_radio");
    this.soundForm.append(this.offSoundInput);
    this.soundForm.append(this.offSoundTitle);
    this.settingsCommonBlock.append(this.sizeOfGame);
    this.sizeOfGame.append(this.sizeOfGameTitle);
    this.sizeForm.classList.add("size_form");
    this.sizeOfGame.append(this.sizeForm);
    this.sizeEasyTitle.textContent = "10x10";
    this.sizeEasyTitle.setAttribute("for", "10");
    this.sizeEasy.setAttribute("id", "10");
    this.sizeEasy.classList.add("input_radio");
    this.sizeEasy.checked = true;
    this.sizeEasy.setAttribute("type", "radio");
    this.sizeEasy.setAttribute("name", "size");
    this.sizeForm.append(this.sizeEasy);
    this.sizeForm.append(this.sizeEasyTitle);
    this.sizeMediumTitle.textContent = "15x15";
    this.sizeMediumTitle.setAttribute("for", "15");
    this.sizeMedium.setAttribute("id", "15");
    this.sizeMedium.setAttribute("type", "radio");
    this.sizeMedium.setAttribute("name", "size");
    this.sizeMedium.classList.add("input_radio");
    this.sizeForm.append(this.sizeMedium);
    this.sizeForm.append(this.sizeMediumTitle);
    this.sizeHardTitle.textContent = "25x25";
    this.sizeHardTitle.setAttribute("for", "25");
    this.sizeHard.setAttribute("id", "25");
    this.sizeHard.setAttribute("type", "radio");
    this.sizeHard.setAttribute("name", "size");
    this.sizeHard.classList.add("input_radio");
    this.sizeForm.append(this.sizeHard);
    this.sizeForm.append(this.sizeHardTitle);
    this.numberOfMines.classList.add("number_mines_block");
    this.settingsCommonBlock.append(this.numberOfMines);
    this.numberOfMinesTitle.classList.add("number_mines_title");
    this.numberOfMinesTitle.textContent = `Number of kittens: ${this.mines} kittens`;
    this.numberOfMines.append(this.numberOfMinesTitle);
    this.numberOfMinesInput.setAttribute("id", "numberOfMines");
    this.numberOfMinesInput.setAttribute("type", "range");
    this.numberOfMinesInput.setAttribute("value", this.mines);
    this.numberOfMinesInput.setAttribute("min", 10);
    this.numberOfMinesInput.setAttribute("max", 99);
    this.numberOfMinesInput.setAttribute("step", 1);
    this.numberOfMinesInput.classList.add("input_range");
    this.numberOfMines.append(this.numberOfMinesInput);
    this.settingsCloseIcon.classList.add("close-button");
    // console.log(this.settingsCloseIcon);
    // console.log(this.settingsCloseIconImage);
    if (this.whiteThemeInput.checked) {
      this.settingsCloseIconImage.src = closeBlack;
    } else if (this.blackThemeInput.checked) {
      this.settingsCloseIconImage.src = closeWhite;
    }
    // console.log(this.settingsCloseIconImage.src);
    this.settingsCloseIconImage.alt = "close";
    this.settingsCloseIconImage.classList.add("close-image");
    // console.log(this.settingsCloseIcon);
    this.settingsCommonBlock.prepend(this.settingsCloseIcon);
    this.settingsCloseIcon.append(this.settingsCloseIconImage);
  }

  receiveResultsBlock() {
    this.resultsBlock.classList.add("results_block");
    this.toolsScoreContainer.append(this.resultsBlock);
    this.resultsTitle.classList.add("results_title");
    this.resultsTitle.textContent = "Results";
    this.resultsBlock.append(this.resultsTitle);
    this.receiveResultsTable();
  }

  receiveResultsTable() {
    this.resultsTable.classList.add("results_table");
    this.resultsCloseIcon.classList.add("close-button");
    if (this.whiteThemeInput.checked) {
      this.resultsCloseIconImage.src = closeBlack;
    } else if (this.blackThemeInput.checked) {
      this.resultsCloseIconImage.src = closeWhite;
    }
    this.resultsCloseIconImage.alt = "close";
    this.resultsCloseIconImage.classList.add("close-image");
    this.resultsTable.append(this.resultsCloseIcon);
    this.resultsCloseIcon.append(this.resultsCloseIconImage);
    this.resultsTableLine.classList.add("results_line");
    this.resultsTable.append(this.resultsTableLine);
    this.resultsItemName.classList.add("results_item");
    this.resultsItemName.textContent = "Name";
    this.resultsTableLine.append(this.resultsItemName);
    this.resultsItemClicks.classList.add("results_item");
    this.resultsItemClicks.textContent = "Clicks";
    this.resultsTableLine.append(this.resultsItemClicks);
    this.resultsItemDuration.classList.add("results_item");
    this.resultsItemDuration.textContent = "Time";
    this.resultsTableLine.append(this.resultsItemDuration);
  }

  receiveResultsTablefromSave() {
    if (localStorage.getItem("savedResultsMineSweeper")) {
      // console.log(this.arrayForClicks);
      // console.log(this.resultsFromSave.clicks != undefined);
      // console.log(this.resultsFromSave.clicks);
      if (this.resultsFromSave.clicks != undefined) {
        // console.log(typeof this.resultsFromSave.name);
        // console.log(typeof this.resultsFromSave.clicks);
        // console.log(typeof this.resultsFromSave.time);
        this.arrayForNames = [...this.resultsFromSave.name];
        this.arrayForClicks = [...this.resultsFromSave.clicks];
        this.arrayForTime = [...this.resultsFromSave.time];
        // console.log(this.arrayForNames);
        // console.log(this.arrayForClicks);
        // console.log(this.arrayForTime);
        // console.log(this.arrayForNames);
        // console.log(this.arrayForClicks);
        // console.log(this.arrayForTime);
        for (let i = 0; i < this.arrayForClicks.length; i++) {
          let resultsTableLine = document.createElement("div");
          resultsTableLine.classList.add("results_line");
          this.resultsTable.append(resultsTableLine);
          let resultsItemName = document.createElement("div");
          resultsItemName.classList.add("results_item");
          resultsItemName.textContent = this.arrayForNames[i];
          resultsTableLine.append(resultsItemName);
          let resultsItemClicks = document.createElement("div");
          resultsItemClicks.classList.add("results_item");
          resultsItemClicks.textContent = this.arrayForClicks[i];
          resultsTableLine.append(resultsItemClicks);
          let resultsItemDuration = document.createElement("div");
          resultsItemDuration.classList.add("results_item");
          resultsItemDuration.textContent = this.arrayForTime[i];
          resultsTableLine.append(resultsItemDuration);
        }
      }
    }
  }

  makeNoteInResults() {
    if (this.resultsTable.children.length >= 12) {
      this.resultsTable.children[2].remove();
      this.arrayForNames.shift();
      this.arrayForClicks.shift();
      this.arrayForTime.shift();
    }
    let resultsTableLine = document.createElement("div");
    resultsTableLine.classList.add("results_line");
    this.resultsTable.append(resultsTableLine);
    let resultsItemName = document.createElement("div");
    resultsItemName.classList.add("results_item");
    resultsItemName.textContent = this.resultsName;
    resultsTableLine.append(resultsItemName);
    let resultsItemClicks = document.createElement("div");
    resultsItemClicks.classList.add("results_item");
    resultsItemClicks.textContent = this.productiveClicksCount;
    resultsTableLine.append(resultsItemClicks);
    let resultsItemDuration = document.createElement("div");
    resultsItemDuration.classList.add("results_item");
    resultsItemDuration.textContent = `${this.counterOfTime.textContent.slice(
      10,
      15
    )}`;
    resultsTableLine.append(resultsItemDuration);
    // console.log(this.resultsName);
    this.arrayForNames.push(this.resultsName);
    this.arrayForClicks.push(this.productiveClicksCount);
    this.arrayForTime.push(resultsItemDuration.textContent);
    // console.log(this.arrayForNames);
    // console.log(this.arrayForClicks);
    // console.log(this.arrayForTime);
  }

  receiveMineSweeperBoard() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columms; j++) {
        this.cell = document.createElement("div");
        this.cell.dataset.position = `${i},${j}`;
        this.cell.classList.add("cell");
        if (this.whiteThemeInput.checked) {
          this.cell.style.background = "#fafafa";
        }
        this.game.append(this.cell);
      }
    }
  }

  receiveNumberOfClicks(event) {
    if (
      document.body.children[0].classList.contains("window_result") ||
      this.markForRangeEvent !== 0 ||
      event.target === this.game
    ) {
      // console.log(event.target === this.game);
      event.stopImmediatePropagation();
      return;
    }
    if (event.target.tagName == "DIV") {
      this.cellUnderClick = event.target;
      // console.log(this.cellUnderClick);
    } else {
      this.cellUnderClick = event.target.parentNode;
      // console.log(this.cellUnderClick);
    }
    if (
      !this.cellUnderClick.classList.contains("opened") &&
      !this.cellUnderClick.classList.contains("marked")
    ) {
      this.productiveClicksCount += 1;
      // console.log(this.productiveClicksCount);
      this.numberOfLeftClicks.textContent = `Number of movements: ${this.productiveClicksCount}`;
    }
    this.clickscount += 1;
    if (this.clickscount === 1) {
      setTimeout(function() {
        gameMiner.countTime();
        // console.log('start');
      }, 0);
      this.timerIdForStop = setInterval(function() {
        gameMiner.countTime();
      }, 1000);
    }
  }

  receiveMinesField(event) {
    // console.log(event);
    // console.log(event.target);
    if (
      (!this.cell &&
        !this.cell.contains.classList.contains("opened") &&
        event.type === "click") ||
      event.target === this.game
    ) {
      console.log(event.target === this.game);
      return;
    } else {
      this.cellWithOutBomb = event.target;
      let cellWithOutBombRowPosition = parseInt(
        this.cellWithOutBomb.dataset.position.split(",")[0]
      );
      let cellWithOutBombColumnPosition = parseInt(
        this.cellWithOutBomb.dataset.position.split(",")[1]
      );
      // console.log(cellWithOutBombRowPosition);
      // console.log(cellWithOutBombColumnPosition);
      for (let i = 0; i < this.minesField.length; i++) {
        this.minesField[i] = new Array();
      }
      for (let i = 0; i < this.minesField.length; i++) {
        for (let j = 0; j < this.columms; j++) {
          this.minesField[i].push(0);
        }
      }
      this.receiveMines(
        cellWithOutBombRowPosition,
        cellWithOutBombColumnPosition
      );
      // console.log(this.minesField);
      this.receiveNumberOfMinesAround();
      // this.fillMinesBoardFromMinesField();
      this.counterOfMines.textContent = `Number of hidden dreaming cats: ${this.restMines}`;
      this.counterOfFlags.textContent = `Number of paws: ${this.flags}`;
    }
  }

  receiveMines(cellWithOutBombRowPosition, cellWithOutBombColumnPosition) {
    for (let k = this.mines; k > 0; k--) {
      // console.log(this.mines);
      // console.log(k);
      let rowPosition = Math.round(Math.random() * (this.rows - 1));
      let columnPosition = Math.round(Math.random() * (this.columms - 1));
      // console.log(typeof cellWithOutBombRowPosition);
      // console.log(columnPosition);
      while (
        this.minesField[rowPosition][columnPosition] === "m" ||
        (rowPosition === cellWithOutBombRowPosition &&
          columnPosition === cellWithOutBombColumnPosition)
      ) {
        // console.log("ghbjkhdfjf");
        rowPosition = Math.round(Math.random() * (this.rows - 1));
        columnPosition = Math.round(Math.random() * (this.columms - 1));
      }
      this.minesField[rowPosition][columnPosition] = "m";
    }
    // console.log(this.minesField);
    let count = 0;
    for (let i = 0; i < this.minesField.length; i++) {
      for (let j = 0; j < this.minesField[i].length; j++) {
        if (this.minesField[i][j] === "m") {
          count++;
        }
      }
    }
    // console.log(count);
  }

  receiveNumberOfMinesAround() {
    // console.log(this.minesField);
    for (let i = 0; i < this.minesField.length; i++) {
      for (let j = 0; j < this.minesField[i].length; j++) {
        let countMinesAround = 0;
        if (this.minesField[i][j] !== "m") {
          if (i > 0 && j > 0 && this.minesField[i - 1][j - 1] === "m") {
            countMinesAround = countMinesAround + 1;
            // console.log("[i - 1][j - 1]");
          }
          if (i > 0 && this.minesField[i - 1][j] === "m") {
            countMinesAround = countMinesAround + 1;
            // console.log("[i - 1][j]");
          }
          if (
            i > 0 &&
            j < this.minesField[i].length - 1 &&
            this.minesField[i - 1][j + 1] === "m"
          ) {
            countMinesAround = countMinesAround + 1;
            // console.log("[i - 1][j + 1]");
          }
          if (j > 0 && this.minesField[i][j - 1] === "m") {
            countMinesAround = countMinesAround + 1;
            // console.log("[i][j - 1]");
          }
          if (
            j < this.minesField[i].length - 1 &&
            this.minesField[i][j + 1] === "m"
          ) {
            countMinesAround = countMinesAround + 1;
            // console.log("[i][j + 1]");
          }
          if (
            i < this.minesField.length - 1 &&
            j > 0 &&
            this.minesField[i + 1][j - 1] === "m"
          ) {
            countMinesAround = countMinesAround + 1;
            // console.log("[i + 1][j - 1]");
          }
          if (
            i < this.minesField.length - 1 &&
            this.minesField[i + 1][j] === "m"
          ) {
            countMinesAround = countMinesAround + 1;
            // console.log("[i + 1][j]");
          }
          if (
            i < this.minesField.length - 1 &&
            j < this.minesField[i].length - 1 &&
            this.minesField[i + 1][j + 1] === "m"
          ) {
            countMinesAround = countMinesAround + 1;
            // console.log("[i + 1][j + 1]");
          }
          this.minesField[i][j] = countMinesAround;
        }
      }
    }
  }

  fillMinesBoardFromMinesField() {
    console.log(this.game.children.length);
    for (let i = 0; i < this.game.children.length; i++) {
      let currentCellRow = parseInt(
        this.game.children[i].dataset.position.split(",")[0]
      );
      let currentCellColumn = parseInt(
        this.game.children[i].dataset.position.split(",")[1]
      );
      this.game.children[i].textContent = this.minesField[currentCellRow][
        currentCellColumn
      ];
    }
  }

  openCell(event) {
    // console.log(event);
    // console.log(event.target);
    // console.log(this.markForRangeEvent);
    if (
      document.body.children[0].classList.contains("window_result") ||
      (this.markForRangeEvent !== 0 && this.productiveClicksCount > 0) ||
      event.target === this.game
    ) {
      // console.log(event.target === this.game);
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    } else {
      if (event.target.tagName == "IMG ") {
        event.preventDefault();
      }
      if (
        (!this.cell &&
          !this.cell.contains.classList.contains("cell") &&
          event.type === "click") ||
        (!this.cell &&
          !this.cell.contains.classList.contains("cell") &&
          event.type === "contextmenu")
      ) {
        event.preventDefault();
        return;
      } else {
        if (event.target.tagName == "DIV") {
          this.currentCell = event.target;
          // console.log(this.currentCell);
        } else {
          this.currentCell = event.target.parentNode;
          // console.log(this.currentCell);
        }
        let cellCurrentRowPosition = parseInt(
          this.currentCell.dataset.position.split(",")[0]
        );
        let cellCurrentColumnPosition = parseInt(
          this.currentCell.dataset.position.split(",")[1]
        );
        if (event.type === "click") {
          if (
            !this.currentCell.classList.contains("opened") &&
            !this.currentCell.classList.contains("marked")
          ) {
            this.currentCell.classList.add("opened");
            this.currentCell.style.background = "#c8c8c8";
            if (
              this.minesField[cellCurrentRowPosition][
                cellCurrentColumnPosition
              ] === "m"
            ) {
              this.audioForMineCell.play();
              let image = document.createElement("img");
              image.classList.add("mine");
              if (this.whiteThemeInput.checked) {
                image.src = blackkitten;
              } else if (this.blackThemeInput.checked) {
                image.src = blindkitten;
              }

              this.currentCell.append(image);
              this.openRestSellsOfFieldIfMine();
              this.currentCell.style.background = "red";
              this.makeResultMessage(
                cellCurrentRowPosition,
                cellCurrentColumnPosition
              );
              this.openResultWindow();
            }
            if (
              this.minesField[cellCurrentRowPosition][
                cellCurrentColumnPosition
              ] !== "m" &&
              this.minesField[cellCurrentRowPosition][
                cellCurrentColumnPosition
              ] !== 0
            ) {
              this.audioForOpenCell.play();
              this.currentCell.textContent = this.minesField[
                cellCurrentRowPosition
              ][cellCurrentColumnPosition];
              this.makeDigitsColorful(
                cellCurrentRowPosition,
                cellCurrentColumnPosition
              );
              this.makeValidationForWinningForRestUnOpenedSells(
                cellCurrentRowPosition,
                cellCurrentColumnPosition
              );
            }
            if (
              this.minesField[cellCurrentRowPosition][
                cellCurrentColumnPosition
              ] === 0
            ) {
              // console.log(this);
              this.audioForOpenCell.play();
              this.openCellsAroundEmptyCell(
                cellCurrentRowPosition,
                cellCurrentColumnPosition
              );
              this.makeValidationForWinningForRestUnOpenedSells(
                cellCurrentRowPosition,
                cellCurrentColumnPosition
              );
            } else {
              return;
            }
          }
        } else if (event.type === "contextmenu") {
          event.preventDefault();
          if (
            !this.currentCell.classList.contains("marked") &&
            !this.currentCell.classList.contains("opened")
          ) {
            this.audioForFlagCell.play();
            // console.log("hello");
            this.currentCell.classList.toggle("marked");
            let image = document.createElement("img");
            image.classList.add("flag");
            if (this.blackThemeInput.checked) {
              image.src = blindpaw;
            } else if (this.whiteThemeInput.checked) {
              image.src = blackpaw;
            }
            this.currentCell.append(image);
            this.countOfRestMines(cellCurrentRowPosition,cellCurrentColumnPosition);
            if (this.flags === 0) {
              // console.log(this.flags);
              this.makeValidationForWinningForMarkedSells(
                cellCurrentRowPosition,
                cellCurrentColumnPosition
              );
            }
          } else if (this.currentCell.classList.contains("marked")) {
            this.audioForFlagCell.play();
            // console.log("very bad");
            this.currentCell.classList.toggle("marked");
            this.currentCell.children[0].remove();
            this.countOfRestMines(cellCurrentRowPosition,cellCurrentColumnPosition);
            if (this.flags === 0) {
              // console.log(this.flags);
              this.makeValidationForWinningForMarkedSells(
                cellCurrentRowPosition,
                cellCurrentColumnPosition
              );
            }
          }
        }
      }
    }
  }

  countOfRestMines(cellCurrentRowPosition,cellCurrentColumnPosition) {
    // console.log(this.currentCell);
    if (this.currentCell.classList.contains("marked")) {
      this.flags = this.flags - 1;
      if (this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] ==='m') {
        // console.log(this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition]);
        this.restMines = this.restMines - 1;
        // console.log(this.restMines);
      }
      // console.log(this.flags);
      // console.log(this.mines);
      this.counterOfMines.textContent = `Number of hidden dreaming cats: ${this.restMines}`;
      this.counterOfFlags.textContent = `Number of paws: ${this.flags}`;
    } else if (!this.currentCell.classList.contains("marked")) {
      this.flags = this.flags + 1;
      if (this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] ==='m') {
        this.restMines = this.restMines + 1;
      }
      this.counterOfMines.textContent = `Number of hidden dreaming cats: ${this.restMines}`;
      this.counterOfFlags.textContent = `Number of paws: ${this.flags}`;
    }
  }

  openCellsAroundEmptyCell(cellCurrentRowPosition, cellCurrentColumnPosition) {
    let currentCellOnCheckStart = new Object();
    let currentCellOnCheckStartDataset = [];
    currentCellOnCheckStartDataset.push(cellCurrentRowPosition.toString());
    currentCellOnCheckStartDataset.push(cellCurrentColumnPosition.toString());
    currentCellOnCheckStartDataset = currentCellOnCheckStartDataset.join(",");
    // console.log(currentCellOnCheckStartDataset);
    for (let i = 0; i < this.game.children.length; i++) {
      if (
        currentCellOnCheckStartDataset ===
        this.game.children[i].dataset.position
      ) {
        this.game.children[i].dataset.cheked = true;
        currentCellOnCheckStart = this.game.children[i];
      }
    }
    // console.log(currentCellOnCheckStart);
    // console.log(!!currentCellOnCheckStart.dataset.cheked);
    if (
      cellCurrentRowPosition > 0 &&
      cellCurrentColumnPosition > 0 &&
      this.minesField[cellCurrentRowPosition - 1][
        cellCurrentColumnPosition - 1
      ] !== "m"
    ) {
      let currentDataSet = [];
      currentDataSet.push((cellCurrentRowPosition - 1).toString());
      currentDataSet.push((cellCurrentColumnPosition - 1).toString());
      currentDataSet = currentDataSet.join(",");
      // console.log(
      //   this.minesField[cellCurrentRowPosition - 1][
      //     cellCurrentColumnPosition - 1
      //   ]
      // );
      let currentCellOnCheck = new Object();
      for (let i = 0; i < this.game.children.length; i++) {
        if (currentDataSet === this.game.children[i].dataset.position) {
          currentCellOnCheck = this.game.children[i];
          // console.log(this.game.children[i]);
          // console.log(currentCellOnCheck);
          if (!this.game.children[i].classList.contains("marked")) {
            this.game.children[i].classList.add("opened");
            this.game.children[i].style.background = "#c8c8c8";
            if (
              this.minesField[cellCurrentRowPosition - 1][
                cellCurrentColumnPosition - 1
              ] !== 0
            ) {
              this.game.children[i].innerHTML = this.minesField[
                cellCurrentRowPosition - 1
              ][cellCurrentColumnPosition - 1];
            }
            // console.log(currentCellOnCheck);
            this.makeDigitsColorful(
              cellCurrentRowPosition - 1,
              cellCurrentColumnPosition - 1,
              currentCellOnCheck
            );
          }
        }
      }
      // console.log(currentCellOnCheck);
      // console.log(!currentCellOnCheck.dataset.cheked);
      if (
        this.minesField[cellCurrentRowPosition - 1][
          cellCurrentColumnPosition - 1
        ] === 0 &&
        !currentCellOnCheck.dataset.cheked
      ) {
        this.openCellsAroundEmptyCell(
          cellCurrentRowPosition - 1,
          cellCurrentColumnPosition - 1
        );
      }
    }

    if (
      cellCurrentRowPosition > 0 &&
      this.minesField[cellCurrentRowPosition - 1][cellCurrentColumnPosition] !==
        "m"
    ) {
      let currentDataSet = [];
      currentDataSet.push((cellCurrentRowPosition - 1).toString());
      currentDataSet.push(cellCurrentColumnPosition.toString());
      currentDataSet = currentDataSet.join(",");
      // console.log(
      //   this.minesField[cellCurrentRowPosition - 1][cellCurrentColumnPosition]
      // );
      let currentCellOnCheck = new Object();
      for (let i = 0; i < this.game.children.length; i++) {
        if (currentDataSet === this.game.children[i].dataset.position) {
          currentCellOnCheck = this.game.children[i];
          if (!this.game.children[i].classList.contains("marked")) {
            this.game.children[i].classList.add("opened");
            this.game.children[i].style.background = "#c8c8c8";
            if (
              this.minesField[cellCurrentRowPosition - 1][
                cellCurrentColumnPosition
              ] !== 0
            ) {
              this.game.children[i].innerHTML = this.minesField[
                cellCurrentRowPosition - 1
              ][cellCurrentColumnPosition];
            }
            this.makeDigitsColorful(
              cellCurrentRowPosition - 1,
              cellCurrentColumnPosition,
              currentCellOnCheck
            );
          }
        }
      }
      if (
        this.minesField[cellCurrentRowPosition - 1][
          cellCurrentColumnPosition
        ] === 0 &&
        !currentCellOnCheck.dataset.cheked
      ) {
        this.openCellsAroundEmptyCell(
          cellCurrentRowPosition - 1,
          cellCurrentColumnPosition
        );
      }
    }
    if (
      cellCurrentRowPosition > 0 &&
      cellCurrentColumnPosition <
        this.minesField[cellCurrentRowPosition].length - 1 &&
      this.minesField[cellCurrentRowPosition - 1][
        cellCurrentColumnPosition + 1
      ] !== "m"
    ) {
      let currentDataSet = [];
      currentDataSet.push((cellCurrentRowPosition - 1).toString());
      currentDataSet.push((cellCurrentColumnPosition + 1).toString());
      // console.log(
      //   this.minesField[cellCurrentRowPosition - 1][
      //     cellCurrentColumnPosition + 1
      //   ]
      // );
      currentDataSet = currentDataSet.join(",");
      let currentCellOnCheck = new Object();
      for (let i = 0; i < this.game.children.length; i++) {
        if (currentDataSet === this.game.children[i].dataset.position) {
          currentCellOnCheck = this.game.children[i];
          if (!this.game.children[i].classList.contains("marked")) {
            this.game.children[i].classList.add("opened");
            this.game.children[i].style.background = "#c8c8c8";
            if (
              this.minesField[cellCurrentRowPosition - 1][
                cellCurrentColumnPosition + 1
              ] !== 0
            ) {
              this.game.children[i].innerHTML = this.minesField[
                cellCurrentRowPosition - 1
              ][cellCurrentColumnPosition + 1];
            }

            this.makeDigitsColorful(
              cellCurrentRowPosition - 1,
              cellCurrentColumnPosition + 1,
              currentCellOnCheck
            );
          }
        }
      }
      if (
        this.minesField[cellCurrentRowPosition - 1][
          cellCurrentColumnPosition + 1
        ] === 0 &&
        !currentCellOnCheck.dataset.cheked
      ) {
        this.openCellsAroundEmptyCell(
          cellCurrentRowPosition - 1,
          cellCurrentColumnPosition + 1
        );
      }
    }
    if (
      cellCurrentColumnPosition > 0 &&
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition - 1] !==
        "m"
    ) {
      let currentDataSet = [];
      currentDataSet.push(cellCurrentRowPosition.toString());
      currentDataSet.push((cellCurrentColumnPosition - 1).toString());
      currentDataSet = currentDataSet.join(",");
      let currentCellOnCheck = new Object();
      for (let i = 0; i < this.game.children.length; i++) {
        if (currentDataSet === this.game.children[i].dataset.position) {
          currentCellOnCheck = this.game.children[i];
          if (!this.game.children[i].classList.contains("marked")) {
            this.game.children[i].classList.add("opened");
            this.game.children[i].style.background = "#c8c8c8";
            if (
              this.minesField[cellCurrentRowPosition][
                cellCurrentColumnPosition - 1
              ] !== 0
            ) {
              this.game.children[i].innerHTML = this.minesField[
                cellCurrentRowPosition
              ][cellCurrentColumnPosition - 1];
            }

            this.makeDigitsColorful(
              cellCurrentRowPosition,
              cellCurrentColumnPosition - 1,
              currentCellOnCheck
            );
          }
        }
      }
      if (
        this.minesField[cellCurrentRowPosition][
          cellCurrentColumnPosition - 1
        ] === 0 &&
        !currentCellOnCheck.dataset.cheked
      ) {
        this.openCellsAroundEmptyCell(
          cellCurrentRowPosition,
          cellCurrentColumnPosition - 1
        );
      }
    }
    if (
      cellCurrentColumnPosition <
        this.minesField[cellCurrentRowPosition].length - 1 &&
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition + 1] !==
        "m"
    ) {
      let currentDataSet = [];
      currentDataSet.push(cellCurrentRowPosition.toString());
      currentDataSet.push((cellCurrentColumnPosition + 1).toString());
      currentDataSet = currentDataSet.join(",");
      let currentCellOnCheck = new Object();
      for (let i = 0; i < this.game.children.length; i++) {
        if (currentDataSet === this.game.children[i].dataset.position) {
          currentCellOnCheck = this.game.children[i];
          if (!this.game.children[i].classList.contains("marked")) {
            this.game.children[i].classList.add("opened");
            this.game.children[i].style.background = "#c8c8c8";
            if (
              this.minesField[cellCurrentRowPosition][
                cellCurrentColumnPosition + 1
              ] !== 0
            ) {
              this.game.children[i].innerHTML = this.minesField[
                cellCurrentRowPosition
              ][cellCurrentColumnPosition + 1];
            }
            this.makeDigitsColorful(
              cellCurrentRowPosition,
              cellCurrentColumnPosition + 1,
              currentCellOnCheck
            );
          }
        }
      }
      if (
        this.minesField[cellCurrentRowPosition][
          cellCurrentColumnPosition + 1
        ] === 0 &&
        !currentCellOnCheck.dataset.cheked
      ) {
        this.openCellsAroundEmptyCell(
          cellCurrentRowPosition,
          cellCurrentColumnPosition + 1
        );
      }
    }
    if (
      cellCurrentRowPosition < this.minesField.length - 1 &&
      cellCurrentColumnPosition > 0 &&
      this.minesField[cellCurrentRowPosition + 1][
        cellCurrentColumnPosition - 1
      ] !== "m"
    ) {
      let currentDataSet = [];
      currentDataSet.push((cellCurrentRowPosition + 1).toString());
      currentDataSet.push((cellCurrentColumnPosition - 1).toString());
      currentDataSet = currentDataSet.join(",");
      let currentCellOnCheck = new Object();
      for (let i = 0; i < this.game.children.length; i++) {
        if (currentDataSet === this.game.children[i].dataset.position) {
          currentCellOnCheck = this.game.children[i];
          if (!this.game.children[i].classList.contains("marked")) {
            this.game.children[i].classList.add("opened");
            this.game.children[i].style.background = "#c8c8c8";
            if (
              this.minesField[cellCurrentRowPosition + 1][
                cellCurrentColumnPosition - 1
              ] !== 0
            ) {
              this.game.children[i].innerHTML = this.minesField[
                cellCurrentRowPosition + 1
              ][cellCurrentColumnPosition - 1];
            }
            this.makeDigitsColorful(
              cellCurrentRowPosition + 1,
              cellCurrentColumnPosition - 1,
              currentCellOnCheck
            );
          }
        }
      }
      if (
        this.minesField[cellCurrentRowPosition + 1][
          cellCurrentColumnPosition - 1
        ] === 0 &&
        !currentCellOnCheck.dataset.cheked
      ) {
        this.openCellsAroundEmptyCell(
          cellCurrentRowPosition + 1,
          cellCurrentColumnPosition - 1
        );
      }
    }
    if (
      cellCurrentRowPosition < this.minesField.length - 1 &&
      this.minesField[cellCurrentRowPosition + 1][cellCurrentColumnPosition] !==
        "m"
    ) {
      let currentDataSet = [];
      currentDataSet.push((cellCurrentRowPosition + 1).toString());
      currentDataSet.push(cellCurrentColumnPosition.toString());
      currentDataSet = currentDataSet.join(",");
      let currentCellOnCheck = new Object();
      for (let i = 0; i < this.game.children.length; i++) {
        if (currentDataSet === this.game.children[i].dataset.position) {
          currentCellOnCheck = this.game.children[i];
          if (!this.game.children[i].classList.contains("marked")) {
            this.game.children[i].classList.add("opened");
            this.game.children[i].style.background = "#c8c8c8";
            if (
              this.minesField[cellCurrentRowPosition + 1][
                cellCurrentColumnPosition
              ] !== 0
            ) {
              this.game.children[i].innerHTML = this.minesField[
                cellCurrentRowPosition + 1
              ][cellCurrentColumnPosition];
            }

            this.makeDigitsColorful(
              cellCurrentRowPosition + 1,
              cellCurrentColumnPosition,
              currentCellOnCheck
            );
          }
        }
      }
      if (
        this.minesField[cellCurrentRowPosition + 1][
          cellCurrentColumnPosition
        ] === 0 &&
        !currentCellOnCheck.dataset.cheked
      ) {
        this.openCellsAroundEmptyCell(
          cellCurrentRowPosition + 1,
          cellCurrentColumnPosition
        );
      }
    }
    if (
      cellCurrentRowPosition < this.minesField.length - 1 &&
      cellCurrentColumnPosition <
        this.minesField[cellCurrentRowPosition].length - 1 &&
      this.minesField[cellCurrentRowPosition + 1][
        cellCurrentColumnPosition + 1
      ] !== "m"
    ) {
      let currentDataSet = [];
      currentDataSet.push((cellCurrentRowPosition + 1).toString());
      currentDataSet.push((cellCurrentColumnPosition + 1).toString());
      currentDataSet = currentDataSet.join(",");
      let currentCellOnCheck = new Object();
      for (let i = 0; i < this.game.children.length; i++) {
        if (currentDataSet === this.game.children[i].dataset.position) {
          currentCellOnCheck = this.game.children[i];
          if (!this.game.children[i].classList.contains("marked")) {
            this.game.children[i].classList.add("opened");
            this.game.children[i].style.background = "#c8c8c8";
            if (
              this.minesField[cellCurrentRowPosition + 1][
                cellCurrentColumnPosition + 1
              ] !== 0
            ) {
              this.game.children[i].innerHTML = this.minesField[
                cellCurrentRowPosition + 1
              ][cellCurrentColumnPosition + 1];
            }

            this.makeDigitsColorful(
              cellCurrentRowPosition + 1,
              cellCurrentColumnPosition + 1,
              currentCellOnCheck
            );
          }
        }
      }
      if (
        this.minesField[cellCurrentRowPosition + 1][
          cellCurrentColumnPosition + 1
        ] === 0 &&
        !currentCellOnCheck.dataset.cheked
      ) {
        this.openCellsAroundEmptyCell(
          cellCurrentRowPosition + 1,
          cellCurrentColumnPosition + 1
        );
      }
    }
  }

  makeDigitsColorful(
    cellCurrentRowPosition,
    cellCurrentColumnPosition,
    currentCellOnCheck
  ) {
    // console.log(this.currentCell);
    // console.log(currentCellOnCheck);
    if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 1
    ) {
      // console.log(cellCurrentRowPosition, cellCurrentColumnPosition);
      // console.log(this.currentCell);
      // console.log(currentCellOnCheck);
      if (this.currentCell.textContent === "1") {
        this.currentCell.classList.add("one");
      }
      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("one");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 2
    ) {
      // console.log(this.currentCell);
      if (this.currentCell.textContent === "2") {
        this.currentCell.classList.add("two");
      }
      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("two");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 3
    ) {
      // console.log(this.currentCell);
      if (this.currentCell.textContent === "3") {
        this.currentCell.classList.add("three");
      }

      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("three");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 4
    ) {
      // console.log(this.currentCell);
      if (this.currentCell.textContent === "4") {
        this.currentCell.classList.add("four");
      }

      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("four");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 5
    ) {
      // console.log(this.currentCell);
      if (this.currentCell.textContent === "5") {
        this.currentCell.classList.add("five");
      }

      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("five");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 6
    ) {
      console.log(this.currentCell);
      if (this.currentCell.textContent === "6") {
        this.currentCell.classList.add("six");
      }

      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("six");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 7
    ) {
      console.log(this.currentCell);
      if (this.currentCell.textContent === "7") {
        this.currentCell.classList.add("seven");
      }
      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("seven");
      }
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 8
    ) {
      console.log(this.currentCell);
      if (this.currentCell.textContent === "8") {
        this.currentCell.classList.add("eight");
      }

      if (currentCellOnCheck != undefined) {
        currentCellOnCheck.classList.add("eight");
      }
    }
  }

  countTime() {
    if (this.seconds > 60) {
      this.minutes = this.minutes + 1;
      this.seconds = 0;
    }
    this.seconds = this.seconds + 1;
    // console.log(this.counterOfTime);
    if (this.seconds < 10) {
      this.counterOfTime.textContent = `Duration: 0${this.minutes}:0${this.seconds} seconds`;
    } else if (this.seconds >= 10) {
      this.counterOfTime.textContent = `Duration: 0${this.minutes}:${this.seconds} seconds`;
    } else if (this.minutes >= 10 && this.seconds < 10) {
      this.counterOfTime.textContent = `Duration: ${this.minutes}:0${this.seconds} seconds`;
    } else if (this.minutes >= 10 && this.seconds >= 10) {
      this.counterOfTime.textContent = `Duration: ${this.minutes}:${this.seconds} seconds`;
    }
  }

  openResultWindow() {
    clearInterval(this.timerIdForStop);
    this.resultWindow.classList.add("window_result");
    this.resultText.classList.add("result_text");
    this.resultOKButton.classList.add("button_ok");
    this.resultOKButton.textContent = "OK";
    this.resultWindow.append(this.resultText);
    this.resultWindow.append(this.resultOKButton);
    document.body.prepend(this.resultWindow);
  }
  openInputWindowForName() {
    this.resultsInputBlock.classList.add("window_name");
    // console.log(this.winGame);
    this.resultsInputBlockTitle.classList.add("window_name_title");
    this.resultsInputBlockTitle.textContent = "Enter your name";
    this.resultsInputBlockInput.setAttribute("id", "player");
    this.resultsInputBlockInput.setAttribute("type", "text");
    this.resultsInputBlockSubmit.classList.add("button_submit");
    this.resultsInputBlockSubmit.textContent = "Submit";
    this.resultsInputBlock.append(this.resultsInputBlockTitle);
    this.resultsInputBlock.append(this.resultsInputBlockInput);
    this.resultsInputBlock.append(this.resultsInputBlockSubmit);
    document.body.prepend(this.resultsInputBlock);
  }

  openWindowForLoadPreviousGame(event) {
    if (localStorage.getItem("savedGameMineSweeper")) {
      this.loadWindow.classList.add("load_window");
      this.loadTitle.classList.add("load_title");
      this.loadTitle.textContent = "Do you want to load previuos game?";
      this.loadWindow.append(this.loadTitle);
      this.loadBlockForButtons.classList.add("load_buttons_block");
      this.loadWindow.append(this.loadBlockForButtons);
      this.loadYesButton.classList.add("load_button");
      this.loadYesButton.textContent = "Yes";
      this.loadBlockForButtons.append(this.loadYesButton);
      this.loadNoButton.classList.add("load_button");
      this.loadNoButton.textContent = "No";
      this.loadBlockForButtons.append(this.loadNoButton);
      document.body.prepend(this.loadWindow);
    }
  }
  makeResultMessage(cellCurrentRowPosition, cellCurrentColumnPosition) {
    clearInterval(this.timerIdForStop);
    if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] ===
        "m" &&
      this.counterOfMarkedKittens !== this.mines
    ) {
      this.resultText.textContent = `Opps!!! Your woke up a kitten and he scratched you. Sorry, but the game is over. Be more cauful next time. Good luck)`;
      // this.audioForGameOver.play();
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] ===
        "m" &&
      this.counterOfMarkedKittens === this.mines &&
      this.flags === 0
    ) {
      this.resultText.textContent = `Cogratulations!!!! You found all kittens in ${this.counterOfTime.textContent.slice(
        10
      )} and ${this.productiveClicksCount} clicks and  didn't wake up them`;
      this.audioForWin.play();
    } else if (
      this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] !==
        "m" &&
      this.counterForRestCellsWithOutBombs === this.numberOfCells - this.mines
    ) {
      this.resultText.textContent = `Cogratulations!!!! You found all kittens in ${this.counterOfTime.textContent.slice(
        10
      )} and ${this.productiveClicksCount} clicks and  didn't wake up them`;
      this.audioForWin.play();
    }
  }

  pressOKonCloseWindow(event) {
    event.stopPropagation();
    // console.log(this.game.children.length);
    if (document.body.children[0].classList.contains("window_result")) {
      document.body.children[0].remove();
    }
    if (this.winGame !== 0) {
      // console.log(this.winGame);
      this.openInputWindowForName();
    } else {
      this.resetAllResultsOfGame(event);
    }
  }

  pressSubmitButtonOnNameWindow(event) {
    event.stopPropagation();
    this.resultsName = this.resultsInputBlockInput.value;
    // console.log(this.resultsName);
    this.makeNoteInResults();
    if (document.body.children[0].classList.contains("window_name")) {
      document.body.children[0].remove();
    }
    this.resetAllResultsOfGame(event);
  }

  resetAllResultsOfGame(event) {
    for (let i = this.numberOfCells - 1; i >= 0; i--) {
      // console.log(this.game.children.length);
      this.game.children[i].remove();
    }
    // console.log(event.type);
    if (event.type === "click") {
      this.setNewSizeOfField(event);
      this.setNewNumberOfMines(event);
    }
    this.setNewSizwOFGameGrid();
    this.numberOfCells = this.rows * this.columms;
    this.receiveMineSweeperBoard();
    this.seconds = 0;
    this.minutes = 0;
    this.clickscount = 0;
    this.productiveClicksCount = 0;
    // console.log(this.clickscount);
    this.flags = this.mines;
    this.restMines = this.mines;
    this.minesField = new Array(this.rows);
    this.numberOfLeftClicks.textContent = `Number of movements: ${this.productiveClicksCount}`;
    this.counterOfMines.textContent = `Number of hidden dreaming cats: 0`;
    this.counterOfFlags.textContent = `Number of paws: 0`;
    this.counterOfTime.textContent = `Duration: 00:00 min`;
    this.markForRangeEvent = 0;
    this.winGame = 0;
  }

  makeValidationForWinningForMarkedSells(
    cellCurrentRowPosition,
    cellCurrentColumnPosition
  ) {
    for (let i = 0; i < this.game.children.length; i++) {
      if (this.game.children[i].classList.contains("marked")) {
        let rowPositionOfMarkedCell = parseInt(
          this.game.children[i].dataset.position.split(",")[0]
        );
        let columnPositionOfMarkedCell = parseInt(
          this.game.children[i].dataset.position.split(",")[1]
        );
        if (
          this.minesField[rowPositionOfMarkedCell][
            columnPositionOfMarkedCell
          ] === "m"
        ) {
          this.counterOfMarkedKittens += 1;
        }
      }
    }
    if (
      this.counterOfMarkedKittens === this.mines &&
      this.counterForRestCellsWithOutBombs === this.numberOfCells - this.mines
    ) {
      this.makeResultMessage(cellCurrentRowPosition, cellCurrentColumnPosition);
      this.openResultWindow();
      this.winGame = 1;
    }
    this.counterOfMarkedKittens = 0;
    this.counterForRestCellsWithOutBombs = 0;
  }

  makeValidationForWinningForRestUnOpenedSells(
    cellCurrentRowPosition,
    cellCurrentColumnPosition
  ) {
    this.countCellsWithOutClassOpened(
      cellCurrentRowPosition,
      cellCurrentColumnPosition
    );
    // console.log(this.counterForRestCellsWithOutBombs);
    if (
      this.counterForRestCellsWithOutBombs ===
      this.numberOfCells - this.mines
    ) {
      // console.log(this.counterForRestCellsWithOutBombs);
      this.makeResultMessage(cellCurrentRowPosition, cellCurrentColumnPosition);
      this.openResultWindow();
      this.winGame = 1;
    }
    this.counterForRestCellsWithOutBombs = 0;
    // clearInterval(this.timerIdForStop);
  }

  openRestSellsOfFieldIfMine() {
    for (let i = 0; i < this.game.children.length; i++) {
      let rowPositionOfCell = parseInt(
        this.game.children[i].dataset.position.split(",")[0]
      );
      let columnPositionOfCell = parseInt(
        this.game.children[i].dataset.position.split(",")[1]
      );
      if (!this.game.children[i].classList.contains("marked")) {
        this.game.children[i].style.background = "#c8c8c8";
        // console.log(this.game.children[i]);
        // console.log(rowPositionOfCell, columnPositionOfCell);
        if (this.minesField[rowPositionOfCell][columnPositionOfCell] === "m") {
          // console.log(this.game.children[i]);
          if (this.game.children[i].children.length === 0) {
            this.game.children[i].classList.add("opened");
            let image = document.createElement("img");
            image.classList.add("mine");
            if (this.whiteThemeInput.checked) {
              image.src = blackkitten;
            } else if (this.blackThemeInput.checked) {
              image.src = blindkitten;
            }
            this.game.children[i].append(image);
          }
        }
        if (
          this.minesField[rowPositionOfCell][columnPositionOfCell] !== "m" &&
          this.minesField[rowPositionOfCell][columnPositionOfCell] !== 0
        ) {
          this.game.children[i].textContent = this.minesField[
            rowPositionOfCell
          ][columnPositionOfCell];
          // console.log(this.game.children[i]);
          this.game.children[i].classList.add("opened");
          if (this.minesField[rowPositionOfCell][columnPositionOfCell] === 1) {
            this.game.children[i].classList.add("one");
          } else if (
            this.minesField[rowPositionOfCell][columnPositionOfCell] === 2
          ) {
            this.game.children[i].classList.add("two");
          } else if (
            this.minesField[rowPositionOfCell][columnPositionOfCell] === 3
          ) {
            this.game.children[i].classList.add("three");
          } else if (
            this.minesField[rowPositionOfCell][columnPositionOfCell] === 4
          ) {
            this.game.children[i].classList.add("four");
          } else if (
            this.minesField[rowPositionOfCell][columnPositionOfCell] === 5
          ) {
            this.game.children[i].classList.add("five");
          } else if (
            this.minesField[rowPositionOfCell][columnPositionOfCell] === 6
          ) {
            this.game.children[i].classList.add("six");
          } else if (
            this.minesField[rowPositionOfCell][columnPositionOfCell] === 7
          ) {
            this.game.children[i].classList.add("seven");
          } else if (
            this.minesField[rowPositionOfCell][columnPositionOfCell] === 8
          ) {
            this.game.children[i].classList.add("eight");
          }
        }
        if (this.minesField[rowPositionOfCell][columnPositionOfCell] === 0) {
          this.game.children[i].classList.add("opened");
        }
      } else if (this.game.children[i].classList.contains("marked")) {
        if (this.minesField[rowPositionOfCell][columnPositionOfCell] !== "m") {
          let firstCrossLine = document.createElement("div");
          firstCrossLine.classList.add("cross1");
          let secondCrossLine = document.createElement("div");
          secondCrossLine.classList.add("cross2");
          this.game.children[i].append(firstCrossLine);
          this.game.children[i].append(secondCrossLine);
        }
      }
    }
  }

  countCellsWithOutClassOpened(
    cellCurrentRowPosition,
    cellCurrentColumnPosition
  ) {
    for (let i = 0; i < this.game.children.length; i++) {
      let rowPositionOfMarkedCell = parseInt(
        this.game.children[i].dataset.position.split(",")[0]
      );
      let columnPositionOfMarkedCell = parseInt(
        this.game.children[i].dataset.position.split(",")[1]
      );
      if (this.game.children[i].classList.contains("opened")) {
        if (
          this.minesField[rowPositionOfMarkedCell][
            columnPositionOfMarkedCell
          ] !== "m"
        ) {
          this.counterForRestCellsWithOutBombs += 1;
        }
      }
    }
  }
  setNewSizeOfField(event) {
    clearInterval(this.timerIdForStop);
    if (this.sizeEasy.checked) {
      this.rows = parseInt(this.sizeEasy.getAttribute("id"));
      this.columms = parseInt(this.sizeEasy.getAttribute("id"));
      // console.log(typeof this.rows);
    } else if (this.sizeMedium.checked) {
      this.rows = parseInt(this.sizeMedium.getAttribute("id"));
      this.columms = parseInt(this.sizeMedium.getAttribute("id"));
      // console.log(this.rows);
    } else if (this.sizeHard.checked) {
      this.rows = parseInt(this.sizeHard.getAttribute("id"));
      this.columms = parseInt(this.sizeHard.getAttribute("id"));
      // console.log(this.rows);
    }
    this.markForRangeEvent = 1;
    // console.log(this.markForRangeEvent);
    if (event.type === "change") {
      clearInterval(this.timerIdForStop);
      this.pressOKonCloseWindow(event);
    }

    if (this.clickscount === 0) {
    }
  }
  setNewSizwOFGameGrid() {
    this.game.style.gridTemplateColumns = `repeat(${this.columms}, auto)`;
    this.game.style.gridTemplateRows = `repeat(${this.rows}, auto)`;
  }

  setNewNumberOfMines(event) {
    // console.log(this.numberOfMinesInput.value);
    this.mines = this.numberOfMinesInput.value;
    // console.log(this.mines);
    this.numberOfMinesInput.setAttribute("value", this.mines);
    this.numberOfMinesTitle.textContent = `Number of kittens: ${this.mines} kittens`;
    this.flags = this.mines;
    this.restMines = this.mines;
    this.markForRangeEvent = 1;
    if (event.type === "change") {
      clearInterval(this.timerIdForStop);
      this.pressOKonCloseWindow(event);
    }

    if (this.clickscount === 0) {
    }
  }

  setWhiteTheme() {
    document.body.classList.add('white-theme');
    // console.log(document.body.style.backgroundImage);
    document.body.style.backgroundPosition = "50% 100%";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    this.durationAndGameContainer.style.color = "#FFFFFF";
    this.toolsScoreContainer.style.color = "#FFFFFF";
    this.buttonStartNewGame.style.color = "#000000";
    for (let i = 0; i < this.game.children.length; i++) {
      if (!this.game.children[i].classList.contains("opened")) {
        this.game.children[i].style.background = "#fafafa";
      }
      if (this.game.children[i].classList.contains("marked")) {
        this.game.children[i].children[0].remove();
        let image = document.createElement("img");
        image.classList.add("flag");
        image.src = blackpaw;
        this.game.children[i].append(image);
      }
    }
    this.resultsTitle.style.background = "#fafafa";
    this.resultsTitle.style.color = "#000000";
    this.settigsTitle.style.background = "#fafafa";
    this.settigsTitle.style.color = "#000000";
    this.settingsCommonBlock.style.background = "#fafafa";
    this.settingsCommonBlock.style.color = "#000000";
    this.buttonStartNewGame.style.background = "#fafafa";
    this.buttonStartNewGame.style.color = "#000000";
    this.resultWindow.style.background = "#fafafa";
    this.resultWindow.style.color = "#000000";
    this.resultsTable.style.background = "#fafafa";
    this.resultsTable.style.color = "#000000";
    this.resultsInputBlock.style.background = "#fafafa";
    this.resultsInputBlock.style.color = "#000000";
    this.resultsCloseIcon.style.background = "#fafafa";
    this.resultsCloseIcon.children[0].remove();
    this.resultsCloseIconImage.src = closeBlack;
    this.resultsCloseIcon.append(this.resultsCloseIconImage);
    this.settingsCloseIcon.style.background = "#fafafa";
    this.settingsCloseIcon.children[0].remove();
    this.settingsCloseIconImage.src = closeBlack;
    this.settingsCloseIcon.append(this.settingsCloseIconImage);
    this.loadWindow.style.background = "#fafafa";
    this.loadWindow.style.color = "#000000";
    this.saveButton.style.background = "#fafafa";
    this.saveButton.style.color = "#000000";
  }

  setBlackTheme() {
    document.body.classList.remove('white-theme');
    // document.body.style.background = `url(${whitetheme})`;
    document.body.style.backgroundPosition = "cover";
    document.body.style.backgroundSize = "100% 100%";
    this.durationAndGameContainer.style.color = "#000000";
    this.toolsScoreContainer.style.color = "#000000";
    for (let i = 0; i < this.game.children.length; i++) {
      if (!this.game.children[i].classList.contains("opened")) {
        this.game.children[i].style.background = "#000000";
      }
      if (this.game.children[i].classList.contains("marked")) {
        this.game.children[i].children[0].remove();
        let image = document.createElement("img");
        image.classList.add("flag");
        image.src = blindpaw;
        this.game.children[i].append(image);
      }
    }
    this.resultsTitle.style.background = "#000000";
    this.resultsTitle.style.color = "#FFFFFF";
    this.settigsTitle.style.background = "#000000";
    this.settigsTitle.style.color = "#FFFFFF";
    this.settingsCommonBlock.style.background = "#000000";
    this.settingsCommonBlock.style.color = "#FFFFFF";
    this.buttonStartNewGame.style.background = "#000000";
    this.buttonStartNewGame.style.color = "#FFFFFF";
    this.resultWindow.style.background = "#000000";
    this.resultWindow.style.color = "#FFFFFF";
    this.resultsTable.style.background = "#000000";
    this.resultsTable.style.color = "#FFFFFF";
    this.resultsInputBlock.style.background = "#000000";
    this.resultsInputBlock.style.color = "#FFFFFF";
    this.resultsCloseIcon.style.background = "#000000";
    this.resultsCloseIcon.children[0].remove();
    this.resultsCloseIconImage.src = closeWhite;
    this.resultsCloseIcon.append(this.resultsCloseIconImage);
    this.settingsCloseIcon.style.background = "#000000";
    this.settingsCloseIcon.children[0].remove();
    this.settingsCloseIconImage.src = closeWhite;
    this.settingsCloseIcon.append(this.settingsCloseIconImage);
    this.loadWindow.style.background = "#000000";
    this.loadWindow.style.color = "#FFFFFF";
    this.saveButton.style.background = "#000000";
    this.saveButton.style.color = "#FFFFFF";
  }

  setSoundVolumeOn(event) {
    this.audioForMineCell.volume = 1;
    this.audioForFlagCell.volume = 1;
    this.audioForOpenCell.volume = 1;
    this.audioForGameOver.volume = 1;
    this.audioForWin.volume = 1;
  }
  setSoundVolumeOff(event) {
    this.audioForMineCell.volume = 0;
    this.audioForFlagCell.volume = 0;
    this.audioForOpenCell.volume = 0;
    this.audioForGameOver.volume = 0;
    this.audioForWin.volume = 0;
    console.log(this.audioForOpenCell.volume);
  }

  openSettings(event) {
    if (document.body.children[0].classList.contains("results_table")) {
      document.body.children[0].remove();
    }
    document.body.prepend(this.settingsCommonBlock);
    // this.settingsCommonBlock.classList.toggle("settigs_open");
    // this.blackThemeInput.classList.toggle("open_input");
    // this.whiteThemeInput.classList.toggle("open_input");
    // this.onSoundInput.classList.toggle("open_input");
    // this.offSoundInput.classList.toggle("open_input");
    // this.theme.classList.toggle("open_theme_block");
    // this.themeForm.classList.toggle("open_theme_form");
    // this.sizeOfGame.classList.toggle("size_open");
    // this.sizeForm.classList.toggle("size_form_open");
    // this.sizeEasy.classList.toggle("open_input");
    // this.sizeMedium.classList.toggle("open_input");
    // this.sizeHard.classList.toggle("open_input");
    // this.sound.classList.toggle("sound_theme_block");
    // this.soundForm.classList.toggle("sound_form_open");
    // this.numberOfMines.classList.toggle("number_mines_open");
    // this.numberOfMinesInput.classList.toggle("input_range_open");
    // this.tools.classList.toggle("tools_open");
  }
  closeSettings(event) {
    event.stopPropagation();
    document.body.children[0].remove();
  }
  openResults(event) {
    if (document.body.children[0].classList.contains("settings_container")) {
      document.body.children[0].remove();
    }
    document.body.prepend(this.resultsTable);
  }

  closeResults(event) {
    event.stopPropagation();
    document.body.children[0].remove();
  }

  saveGame(event) {
    for (let i = 0; i < this.game.children.length; i++) {
      if (this.game.children[i].classList.contains("opened")) {
        this.arrayOfClasesOfCells.push("opened");
      } else if (this.game.children[i].classList.contains("marked")) {
        this.arrayOfClasesOfCells.push("marked");
      } else if (!this.game.children[i].classList.contains("marked") && !this.game.children[i].classList.contains("opened")) {
        this.arrayOfClasesOfCells.push("unopened");
      }
    }
    // console.log(this.arrayForClicks.length);
    let resultsForSaveIfUserCloseOrReloadWindow = {};
    if (this.arrayForClicks.length > 0) {
      resultsForSaveIfUserCloseOrReloadWindow = {
        name: this.arrayForNames,
        clicks: this.arrayForClicks,
        time: this.arrayForTime
      };
      let savedResults = JSON.stringify(resultsForSaveIfUserCloseOrReloadWindow);
      localStorage.setItem("savedResultsMineSweeper", savedResults);
      let resultsFromSave = JSON.parse(savedResults);
      // console.log(savedResults);
      // console.log(resultsFromSave);
    }
    let gameForSaveIfUserCloseOrReloadWindow = {};
    if (this.minesField[0] != undefined) {
      gameForSaveIfUserCloseOrReloadWindow = {
        fieldWithMines: this.minesField,
        rows: this.rows,
        mines: this.mines,
        columns: this.columms,
        gameField: this.arrayOfClasesOfCells,
        allClicks: this.clickscount,
        productiveClicks: this.productiveClicksCount,
        timer: this.counterOfTime.textContent.slice(10, 15),
        flags: this.flags,
        restMines: this.restMines,
        whiteTheme: this.whiteThemeInput.checked,
        blackTheme: this.blackThemeInput.checked,
        onSound: this.onSoundInput.checked,
        offSound: this.offSoundInput.checked,
        size10: this.sizeEasy.checked,
        size15: this.sizeMedium.checked,
        size25: this.sizeHard.checked,
        numberOfMinesInput: this.numberOfMinesInput.value
      };
      let savedGame = JSON.stringify(gameForSaveIfUserCloseOrReloadWindow);
      let gameFromSave = JSON.parse(savedGame);
      // console.log(!!localStorage.getItem("savedGameMineSweeper"));
      localStorage.setItem("savedGameMineSweeper", savedGame);
      this.arrayOfClasesOfCells = [];
      // console.log(Storage.key);
      // console.log(savedGame);
      // console.log(gameFromSave);
    }
  }

  receivePreviousGameInSave() {
    this.resultsFromSave = JSON.parse(
      localStorage.getItem("savedResultsMineSweeper")
    );
    this.gameFromSave = JSON.parse(
      localStorage.getItem("savedGameMineSweeper")
    );
    // console.log(this.minesField);
    // console.log(this.minesField[0] == undefined);
    // console.log(this.resultsFromSave);
    // console.log(this.gameFromSave);
    this.openWindowForLoadPreviousGame();
    this.receiveResultsTablefromSave();
  }

  closeLoadWindow(event) {
    event.stopPropagation();
    if (document.body.children[0].classList.contains("load_window")) {
      document.body.children[0].remove();
    }
  }

  loadPreviousGame(event) {
    // lead theme
    if (this.gameFromSave.whiteTheme === true) {
      this.whiteThemeInput.checked = true;
      this.setWhiteTheme();
    }
    if (this.gameFromSave.offSound === true) {
      this.offSoundInput.checked = true;
      this.setSoundVolumeOff();
    }
    if (this.gameFromSave.size15 === true) {
      this.sizeMedium.checked = true;
    } else if (this.gameFromSave.size25 === true) {
      this.sizeHard.checked = true;
    }
    this.mines = this.gameFromSave.mines;
    this.numberOfMinesInput.value = this.gameFromSave.mines;
    this.numberOfMinesTitle.textContent = `Number of kittens: ${this.mines} kittens`;
    this.minesField = JSON.parse(
      JSON.stringify(this.gameFromSave.fieldWithMines)
    );
    this.rows = this.gameFromSave.rows;
    this.columms = this.gameFromSave.columns;
    this.clickscount = this.gameFromSave.allClicks;
    this.productiveClicksCount = this.gameFromSave.productiveClicks;
    this.numberOfLeftClicks.textContent = `Number of movements: ${this.productiveClicksCount}`;
    this.counterOfTime.textContent = `Duration: ${this.gameFromSave.timer} seconds`;
    this.seconds = parseInt(this.gameFromSave.timer.slice(3));
    this.minutes = parseInt(this.gameFromSave.timer.slice(0, 3));
    this.restMines = this.gameFromSave.restMines,
    this.counterOfMines.textContent = `Number of hidden dreaming cats:  ${this.restMines}`;
    this.flags = this.gameFromSave.flags;
    this.counterOfFlags.textContent = `Number of paws: ${this.flags}`;
    // console.log(this.minesField);
    // console.log(this.rows);
    // console.log(this.columms);
    // console.log(this.mines);
    // console.log(this.clickscount);
    // console.log(this.productiveClicksCount);
    // console.log(this.counterOfTime.textContent);
    // console.log(this.flags);
    // console.log(this.restMines);
    // console.log(this.numberOfMinesTitle.textContent);
    // console.log(this.seconds);
    // console.log(this.minutes);
    for (let i = this.numberOfCells - 1; i >= 0; i--) {
      // console.log(this.game.children.length);
      this.game.children[i].remove();
    }
    this.setNewSizwOFGameGrid();
    this.numberOfCells = this.rows * this.columms;
    this.receiveMineSweeperBoard();
    this.fillFieldAfterReload();
    this.closeLoadWindow(event);
      setTimeout(function() {
        gameMiner.countTime();
        // console.log('start');
      }, 0);
      this.timerIdForStop = setInterval(function() {
        gameMiner.countTime();
      }, 1000);
    // this.loadEvent = 1;
    localStorage.removeItem("savedGameMineSweeper");
  }

  fillFieldAfterReload() {
    // console.log(this.gameFromSave.gameField);
    for (let i=0; i<this.game.children.length; i++) {
      let cellCurrentRowPosition = parseInt(
          this.game.children[i].dataset.position.split(",")[0]
        );
        let cellCurrentColumnPosition = parseInt(
          this.game.children[i].dataset.position.split(",")[1]
        );
      if (this.gameFromSave.gameField[i] === 'opened') {
        this.game.children[i].classList.add('opened');
        this.game.children[i].style.background = '#c8c8c8';
        if (
          this.minesField[cellCurrentRowPosition][
            cellCurrentColumnPosition
          ] !== "m" &&
          this.minesField[cellCurrentRowPosition][
            cellCurrentColumnPosition
          ] !== 0
        ) {
          this.game.children[i].textContent =  this.minesField[cellCurrentRowPosition][
            cellCurrentColumnPosition];
            if (
          this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 1
        ) {
          if (this.game.children[i].textContent === "1") {
            this.game.children[i].classList.add("one");
          }
        } else if (
          this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 2
        ) {
          // console.log(this.currentCell);
          if (this.game.children[i].textContent === "2") {
            this.game.children[i].classList.add("two");
          }
        } else if (
          this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 3
        ) {
          // console.log(this.currentCell);
          if (this.game.children[i].textContent === "3") {
            this.game.children[i].classList.add("three");
          }
        } else if (
          this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 4
        ) {
          if (this.game.children[i].textContent === "4") {
            this.game.children[i].classList.add("four");
          }
        } else if (
          this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 5
        ) {
          if (this.game.children[i].textContent === "5") {
            this.game.children[i].classList.add("five");
          }
        } else if (
          this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 6
        ) {
          if (this.game.children[i].textContent === "6") {
            this.game.children[i].classList.add("six");
          }
        } else if (
          this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 7
        ) {
          if (this.game.children[i].textContent === "7") {
            this.game.children[i].classList.add("seven");
          }
        } else if (
          this.minesField[cellCurrentRowPosition][cellCurrentColumnPosition] === 8
        ) {
          if (this.game.children[i].textContent === "8") {
            this.game.children[i].classList.add("eight");
          }
        }
        }

        

      }
      if (this.gameFromSave.gameField[i] === 'marked') {
        this.game.children[i].classList.add("marked");  
        let image = document.createElement("img");
            image.classList.add("flag");
            if (this.blackThemeInput.checked) {
              image.src = blindpaw;
            } else if (this.whiteThemeInput.checked) {
              image.src = blackpaw;
            }
          this.game.children[i].append(image);
      }
    }
  }

  showScore() {
      console.log(`Самооценка работы:

Basic scope +40
-layout, design, responsive UI: +10
-at the beginning state of the game, the frame has size 10x10 and is filled with unopened cells. Should be 10 mines on field by default: +10
-when user click on cells - it should be opened and marked as one of the following state: empty cell, cell with number, or cell with mine: +10
-the game should end when the player reveals all cells that do not contain mines (win) or clicks on mine (lose) and related message is displayed at the end of the game: +10

Advanced scope +80

-mines are placed after the first move, so that user cannot lose on the first move. +20
-user can mark “mined” cells using flags so as not to accidentally open them displaying the number of mines remaining and displaying number of used flags: +10
-the game should use color coding (using numbers and colors) to indicate the number of mines surrounding a revealed cell: +10
-the game can be restarted without reloading the page: +10
-game duration and number of clicks are displayed: +15
-when user opens a square that does not touch any mines, it will be empty and the adjacent squares will automatically open in all directions until reaching squares that contain numbers: +15

Hacker scope +60

-sound accompaniment (on/off) when clicking on cell and at the end of the game: +10
-implement ability to change the size (easy - 10x10, medium - 15x15, hard - 25x25) and number of mines for each size of the field (from 10 to 99): +20
-implemented saving the latest 10 results using LocalStorage: +10
-implemented saving the state of the game: +10
- option to choose different themes for the game board (dark/light themes): +10

Score: 180 points.
      `)
  }
}

let gameMiner = new MineSweeperGame();
// console.log(gameMiner);
gameMiner.receiveMineSweeperGame();
gameMiner.receiveMineSweeperBoard();
gameMiner.receivePreviousGameInSave();
gameMiner.showScore();
gameMiner.game.addEventListener("click", event => {
  gameMiner.receiveNumberOfClicks(event);
  // console.log(gameMiner.clickscount);
  if (gameMiner.clickscount === 1) {
    gameMiner.receiveMinesField(event);
  }
  gameMiner.openCell(event);
});
gameMiner.game.addEventListener("contextmenu", event => {
  gameMiner.openCell(event);
});
gameMiner.resultOKButton.addEventListener("click", event => {
  gameMiner.pressOKonCloseWindow(event);
});
gameMiner.buttonStartNewGame.addEventListener("click", event => {
  gameMiner.setNewSizwOFGameGrid();
  gameMiner.pressOKonCloseWindow(event);
});
gameMiner.resultsInputBlockSubmit.addEventListener("click", event => {
  gameMiner.pressSubmitButtonOnNameWindow(event);
});

gameMiner.settigsTitle.addEventListener("click", event => {
  gameMiner.openSettings(event);
});

gameMiner.resultsTitle.addEventListener("click", event => {
  gameMiner.openResults(event);
});

gameMiner.resultsCloseIcon.addEventListener("click", event => {
  gameMiner.closeResults(event);
  // gameMiner.saveGame(event);
});

gameMiner.settingsCloseIcon.addEventListener("click", event => {
  gameMiner.closeSettings(event);
});

gameMiner.loadNoButton.addEventListener("click", event => {
  gameMiner.closeLoadWindow(event);
});

gameMiner.loadYesButton.addEventListener("click", event => {
  gameMiner.loadPreviousGame(event);
});

gameMiner.saveButton.addEventListener("click", event => {
  gameMiner.saveGame(event);
});

window.addEventListener("unload", event => {
  gameMiner.saveGame(event);
});

gameMiner.sizeEasy.addEventListener("change", event => {
  // console.log(event);
  gameMiner.setNewSizeOfField(event);
  // gameMiner.openSettings(event);
});
gameMiner.sizeMedium.addEventListener("change", event => {
  // console.log(event);
  gameMiner.setNewSizeOfField(event);
  // gameMiner.openSettings(event);
});
gameMiner.sizeHard.addEventListener("change", event => {
  // console.log(event);
  gameMiner.setNewSizeOfField(event);
  // gameMiner.openSettings(event);
});
gameMiner.numberOfMinesInput.addEventListener("change", event => {
  // console.log(event);
  gameMiner.setNewNumberOfMines(event);
  // gameMiner.openSettings(event);
});
gameMiner.whiteThemeInput.addEventListener("change", event => {
  gameMiner.setWhiteTheme(event);
  // gameMiner.openSettings(event);
});
gameMiner.blackThemeInput.addEventListener("change", event => {
  gameMiner.setBlackTheme(event);
  // gameMiner.openSettings(event);
});

gameMiner.onSoundInput.addEventListener("change", event => {
  gameMiner.setSoundVolumeOn(event);
  // gameMiner.openSettings(event);
});
gameMiner.offSoundInput.addEventListener("change", event => {
  gameMiner.setSoundVolumeOff(event);
  // gameMiner.openSettings(event);
});
