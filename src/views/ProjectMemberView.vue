<template>
  <div>
    <div class="container mt-4">
      <h3 class="title fw-bold my-5">ProjectMember</h3>
      <div class="d-flex justify-content-start">
        <div class="memberbox">
          <span class="pjtmember">멤버멤버</span>
        </div>
      </div>
      <router-link
            :to="{ name: 'membercreate' }"
            class="btn1"
            >+ 팀원 추가</router-link>
        </div>
    </div>
  </div>
</template>
<script>

</script>
<style scoped>
.title {
  text-align: left;
  font-family: 'Dela Gothic One', cursive;
}

.memberbox{
  background-color: white;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 1000px;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  border: #D9D9D9 solid 2px;
}

.pjtmember {
  font-weight: bold;
  text-decoration: none;
}

.btn1 {
  color: white;

  background-color: #3485FF;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 100px;
  height: 28px;
  border-radius: 10px;
  border: #D9D9D9 solid 0px;
  text-decoration: none;
  text-align: center;
  box-shadow: inset 0px 0px 0px #F24E1E;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.8s cubic-bezier(.5, .24, 0, 1)
}

.btn1:hover {
  box-shadow: inset 300px 0px 0px 0px #F24E1E;
}

</style>