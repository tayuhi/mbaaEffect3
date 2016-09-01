var size;
var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer0 = new fieldLayer();
    var layer1 = new gameLayer();
    var layer2 = new charaLayer();
    var layer3 = new particleLayer();
    this.addChild(layer0);
    this.addChild(layer1);
    this.addChild(layer2);
    this.addChild(layer3);

  }
});

//デバッグ用ラベル
var debugText;
var gameLayer = cc.Layer.extend({
  sprite: null,
  ctor: function() {
    this._super();
    size = cc.winSize;
    //デバッグ用ラベルをcreate
    debugText = cc.LabelTTF.create("debug","Arial","32", cc.TEXT_ALIGNMENT_CENTER);
    this.addChild(debugText);
    debugText.setPosition(450,size.height - 20);
    return true;
  },

});

var fieldLayer = cc.Layer.extend({
  ctor: function() {
    this._super();

    var size = cc.director.getWinSize();

    var sprite = cc.Sprite.create(res.ss_BattleScene_bg1);
    sprite.setPosition(size.width / 2, size.height / 2);
    sprite.setScale(0.8);
    this.addChild(sprite, 0);
  }
});

var charaLayer = cc.Layer.extend({
  ctor: function() {
    this._super();

    var size = cc.director.getWinSize();

    //水キャラクターを追加
    var sprite11 = cc.Sprite.create(res.chara_princessselect_11);
    sprite11.setPosition(size.width * 0.25, size.height * 0.4);
    sprite11.setScale(0.8);
    this.addChild(sprite11, 0);

    //火属性のキャラクター
    var sprite10 = cc.Sprite.create(res.chara_princessselect_10);
    sprite10.setPosition(size.width * 0.3, size.height * 0.3);
    sprite10.setScale(0.8);
    this.addChild(sprite10, 0);

    //木属性キャラクター
    var sprite12 = cc.Sprite.create(res.chara_princessselect_12);
    sprite12.setPosition(size.width * 0.15, size.height * 0.25);
    sprite12.setScale(0.8);
    this.addChild(sprite12, 0);

    //火属性　敵ｻｺキャラクター
    var sprite1 = cc.Sprite.create(res.chara_enemy_1);
    sprite1.setPosition(size.width * 0.65, size.height * 0.45);
    sprite1.setScale(1.2);
    this.addChild(sprite1, 0);
    //水属性　敵ｻｺキャラクター
    var sprite2 = cc.Sprite.create(res.chara_enemy_2);
    sprite2.setPosition(size.width * 0.70, size.height * 0.35);
    sprite2.setScale(1.2);
    this.addChild(sprite2, 0);
    //火属性　敵ｻｺ中ボスキャラクター
    var sprite4 = cc.Sprite.create(res.chara_enemy_4);
    sprite4.setPosition(size.width * 0.85, size.height * 0.30);
    sprite4.setScale(1.2);
    this.addChild(sprite4, 0);
    //敵追加キャラクター
    var sprite7 = cc.Sprite.create(res.chara_enemy_7);
    sprite7.setPosition(size.width * 0.85, size.height * 0.40);
    sprite7.setScale(1.3);
    this.addChild(sprite7, 0);
  }
});

//パーティクル用のレイヤー
var particleLayer = cc.Layer.extend({
  skillSelect: 0,
  skillLevel: 1,
  skillCnt: 1,

  ctor: function() {
    this._super();
    size = cc.winSize;
    this.scheduleUpdate();
    return true;
  },
  update: function(_dt) {


    if (this.skillCnt == 1) {

      debugText.setString("this.skillCnt:"+this.skillCnt
      + " skillSelect:"+this.skillSelect
      + " skillLevel:"+this.skillLevel
    );

    // this.skillParticle(this.skillSelect, this.skillLevel, 350, 100);
     //debug
    this.skillParticle(4,1, 350, 100);

    }
    if ((this.skillCnt % 80) == 0) {
      this.skillCnt = 0;
      this.skillLevel++;
      //HealとSlipスキル追加
      if(this.skillSelect<3) {
        this.skillLevel = this.skillLevel  % 5;
      } else {
        this.skillLevel = this.skillLevel  % 2;
      }

      this.removeAllChildren();
      if (this.skillLevel == 0) {
        this.skillLevel++;
        this.skillSelect++;
        this.skillSelect = this.skillSelect % 5;
      }

    }
    //フレームをカウントする
    this.skillCnt++;
    /*
    debugText.setString("this.skillCnt:"+this.skillCnt
    + " skillSelect:"+this.skillSelect
    + " skillLevel:"+this.skillLevel);
*/
  },

//属性とスキルレベルと座標を与えてパーティクルを生成する関数
  skillParticle: function(attrib, rare, x, y) {

    //debugText.setString("attrib:"+attrib);
  　　//HealとSlipスキル追加
    var skillName = ["Fire", "Water", "Wood","Heal","Slip"];
    var sName = "res." + skillName[attrib] + "Texture" + rare + "_plist";

    debugText.setString(sName);

    var tempParticle = new cc.ParticleSystem(eval(sName));
    tempParticle.setPosition(x, y);
    this.addChild(tempParticle, 20);
    tempParticle.setAutoRemoveOnFinish(true);
  },


});
