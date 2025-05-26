<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <!-- <div class="gp mt-4 mb-2"> Tip：演示系统未开放扫码登录，请联系官方人员获取账号密码。 </div> -->
    <div class="gp mt-4 mb-2"> </div>
    <div class="enter-x min-w-64 min-h-64">
      <div class="privacy-policy">
        <div class="section">
          <h2>1. 信息收集</h2>
          <p>我们可能会收集以下信息：</p>
          <ul>
            <li>您在网站上提供的个人信息，如姓名、电子邮件地址</li>
            <li>使用过程中的操作日志、IP地址、浏览器类型等信息</li>
          </ul>
        </div>

        <div class="section">
          <h2>2. 信息使用</h2>
          <p>我们收集的信息将用于以下目的：</p>
          <ul>
            <li>为您提供个性化的服务和内容</li>
            <li>改善网站功能和性能</li>
            <li>与您沟通并回应您的请求</li>
          </ul>
        </div>

        <div class="section">
          <h2>3. 信息共享</h2>
          <p>我们不会将您的个人信息与第三方分享，除非：</p>
          <ul>
            <li>获得您的明确同意</li>
            <li>根据法律法规的要求</li>
          </ul>
        </div>

        <div class="section">
          <h2>4. 信息存储和保护</h2>
          <p>我们会采取合理的安全措施保护您的个人信息：</p>
          <ul>
            <li>加密技术保护信息安全</li>
            <li>限制访问权限，授权人员访问信息</li>
            <li>定期安全审计和漏洞扫描</li>
          </ul>
        </div>

        <div class="section">
          <h2>5. 隐私政策更新</h2>
          <p>我们可能会根据需要更新隐私政策，更新后会在网站上发布</p>
        </div>

        <div class="section">
          <h2>6. 联系我们</h2>
          <p>如果您有任何问题或意见，请通过以下方式联系我们：</p>
          <ul>
            <li>Email: info@example.com</li>
            <li>电话: 123-456-7890</li>
            <li>地址: XX省XX市XX区XX街道XX号</li>
          </ul>
        </div>
      </div>
      <Button
        size="large"
        block
        class="mt-4 enter-x"
        @click="setLoginState(LoginStateEnum.REGISTER)"
      >
        {{ t('sys.login.backSignIn') }}
      </Button>
    </div>
  </template>
</template>
<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Button } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, LoginStateEnum } from './useLogin';

  const { t } = useI18n();
  const { setLoginState, getLoginState } = useLoginState();

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.PRIVACY);
</script>
<style>
  .privacy-policy {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .section {
    margin-bottom: 20px;
  }
  .section h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  ul {
    list-style-type: disc;
    margin-left: 20px;
  }
  li {
    margin-bottom: 5px;
  }
</style>
