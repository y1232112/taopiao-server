package com.example.tp.entity;

public class PageManager {
    private int currentPage=1;
    private int pageSize=10;
    private int totalPage;
    private int totalCount;
    private int nextPage;
    private int prePage;
    private int lastPage;

    private PageManager() {
    }
    public boolean isOutPage(){
        if (this.totalPage>=this.currentPage){
            return false;
        }
        else return true;
    }
    public PageManager(int currentPage, int pageSize, int totalCount) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.totalCount = totalCount;
        setLastPage();
        setPrePage();
        setTotalPage();
        setNextPage();
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }
   private void setTotalPage(){
        this.totalPage=this.totalCount%this.pageSize==0?this.totalCount/this.pageSize:this.totalCount/this.pageSize+1;
   }
   private void setPrePage(){
        this.prePage=this.currentPage-1>=1?this.currentPage-1:1;
   }
   private void setNextPage(){
        this.nextPage=(this.currentPage+1)<this.totalPage?(this.currentPage+1):this.totalPage;
   }
   private void setLastPage(){
        this.lastPage=this.totalCount%this.pageSize==0?this.totalCount-this.pageSize:this.totalCount-this.totalCount%this.pageSize;
   }

    public int getTotalPage() {
        return totalPage;
    }

    public int getNextPage() {
        return nextPage;
    }

    public int getPrePage() {
        return prePage;
    }

    public int getLastPage() {
        return lastPage;
    }

    @Override
    public String toString() {
        return "PageManager{" +
                "currentPage=" + currentPage +
                ", pageSize=" + pageSize +
                ", totalPage=" + totalPage +
                ", totalCount=" + totalCount +
                ", nextPage=" + nextPage +
                ", prePage=" + prePage +
                ", lastPage=" + lastPage +
                '}';
    }
}
