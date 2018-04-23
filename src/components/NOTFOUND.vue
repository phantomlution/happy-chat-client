<style lang="less">
  .sl-page-error{
    color: #fff;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0,0,0,.5);
    padding: 0;
    min-height: 100%;
    -webkit-box-shadow: inset 0 0 75pt rgba(0,0,0,.8);
    box-shadow: inset 0 0 75pt rgba(0,0,0,.8);
    width: 100%;
    height:100%;
    background-color: #21232a;
    display: table;

    .cover{
      display:table-cell;
      vertical-align:middle;
      padding:0 20px;
      color: #fff;
      text-align: center;
      text-shadow: 0 2px 4px rgba(0,0,0,.5);
      padding: 0;
      min-height: 100%;
      box-shadow: inset 0 0 75pt rgba(0,0,0, 0.8);

      h1{
        font-family: inherit;
        font-weight: 500;
        line-height: 1.1;
        color: inherit;
        font-size: 36px;
      }

      .lead{
        color:silver;
        font-size:21px;
        line-height:1.4;
        margin-top: 10px;;
      }
    }
  }

</style>

<template>
  <div class="sl-page-error">
    <div class="cover">
      <h1>{{ error.brief }}<small>&nbsp;&nbsp;Error {{ error.code }}</small></h1>
      <p class="lead">{{ error.detail }}</p>
    </div>
  </div>
</template>

<script>
  export default {
      data: function () {
        return {
          error: {
            code: 404,
            brief: 'Page Not Found',
            detail: 'The url you visited is not exist. Maybe some files got lost.'
          }
        }
      }
  }
</script>
