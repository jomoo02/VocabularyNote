<script setup>
import WordList from './views/WordList.vue';
import WordHeader from './views/WordHeader.vue';
import { NDialogProvider, NMessageProvider, NSpin, NIcon, NLayout, NLayoutHeader,NLayoutContent,NScrollbar } from 'naive-ui';
import { useIndexStore } from './store/index.js'; 
import { Reload } from '@vicons/ionicons5'
const itemList = useIndexStore();

</script>


<template>
  <n-layout position="absolute">
    <n-spin :show=itemList.show>
      <template #icon>
        <n-icon>
          <Reload />
        </n-icon>
      </template>
      <n-layout-header position="static">
        <header>
          <n-message-provider>
            <n-dialog-provider>
              <word-header></word-header>
            </n-dialog-provider>
          </n-message-provider>
        </header>
      </n-layout-header>
      <n-layout  position="absolute" style="top:50px">
        <n-scrollbar>
          <main>
            <section>
              <n-message-provider>
                <n-dialog-provider>
                  <WordList />
                </n-dialog-provider>
              </n-message-provider>
            </section>
          </main>
        </n-scrollbar>
      </n-layout>
    </n-spin>
  </n-layout>
</template>

<style >
*{
  
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  --bg-color: #fff;
  --bg-transparent: rgba(255, 255, 255, 0);
  --border-color: #BFBFBF;
  --ms-line-interval: calc(2.3rem + 0.5px);
  --md-line-interval: calc(2.3rem + 0.275rem);
  --ml-line-interval: calc(2.3rem + 0.28rem);
  --px-to-rem: 0.063rem;

}


header {
  background: #2E4559;
  z-index: auto;
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 50px;
  justify-content: space-around;
  align-items: center;

}

main{
  padding:2.345rem 0;
  min-height: 100vh;
  background: -webkit-linear-gradient(top,
      var(--border-color) 0%,
      var(--border-color) var(--px-to-rem),
      var(--bg-transparent) var(--px-to-rem),
      var(--bg-transparent) 100%);
  background: linear-gradient(to bottom,
      var(--border-color) 0%,
      var(--border-color) var(--px-to-rem),
      var(--bg-transparent) var(--px-to-rem),
      var(--bg-transparent) var(--px-to-rem));
  background-size: 100% 2.3rem;
  background-color: #F2E399;
  height:100%;
  width: 100%;
  margin: 0;
}
@media(max-width: 1199px) {
  html{
    font-size:16.97px;
  }
  main {
      padding-top: 2.42rem
  }
}
@media(max-width: 1023px) {
  html{
    font-size:16.97px;
  }
  main {
    padding-top: 2.365rem
  }
}
@media(max-width: 600px) {
  html{
    font-size:16.97px;
  }
  main {
    padding-top: 2.347rem;
  }
}

.n-spin-container{
  position: inherit;
}
</style>
