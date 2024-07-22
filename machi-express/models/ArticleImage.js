import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'ArticleImage',
    {
      article_image_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      article_id_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      article_image_filename: {
        type: DataTypes.STRING(600),
        allowNull: false,
      },
    },
    {
      tableName: 'article_image', //直接提供資料表名稱
      timestamps: false, // 關閉時間戳，因為你的資料表結構中沒有相應的欄位
      paranoid: false, // 軟性刪除
      underscored: true, // 所有自動建立欄位，使用snake_case命名
    }
  )
}
