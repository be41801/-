library(stringi)
library(stringr)
library(xml2)
library(pipeR)
library(purrr)
########################獴秖########################

setwd("C:/Users/win7/Desktop/earthquake/rainData")
getwd()

for (i in 2002:2016){
  dat <-
    read_html(paste("http://www.cwb.gov.tw/V7/climate/dailyPrecipitation/Data/466990_",i,".htm",sep=""),
              "UTF-8") %>>%
    xml_find_all('//table[@class="Form00"]/tr') %>>%  
    map(~ when(.,
               identical(class(try({xml_find_one(., 'td')})), "try-error") ~
                 xml_find_all(., 'th'),
               ~ xml_find_all(., 'td')
    ) %>>% xml_text %>>%
      when(
        identical(.Platform$OS.type, "windows") ~ stri_conv(., "UTF-8", "BIG5"), 
        ~ .
      ) %>>%
      str_replace_all("\\s", "")
    )
  web <- do.call(rbind, dat[2:32])
  write.csv(web,file=paste("rain",i,".csv",sep=""))
}


rain_files <- list.files()[grepl('\\.csv', list.files())] 
rain_tables <- vector('list', length(rain_files))
for (i in seq_along(rain_files)){
  rain_tables[[i]] <- read.csv(rain_files[[i]],stringsAsFactors=FALSE)
  rain_tables[[i]] <- do.call(rbind, rain_tables[[i]])
  rownames(rain_tables[[i]]) <- c("DAY","る","る","る","る",
                                  "きる","せる","る","る",
                                  "る","る","る","る")
}
names(rain_tables) <- c("2002","2003","2004","2005","2006",
                        "2007","2008","2009","2010",
                        "2011","2012","2013","2014","2015","2016")


raindata = c(rain_tables$`2002`[2,],rain_tables$`2002`[3,],rain_tables$`2002`[4,],rain_tables$`2002`[5,],rain_tables$`2002`[6,],
             rain_tables$`2002`[7,],rain_tables$`2002`[8,],rain_tables$`2002`[9,],rain_tables$`2002`[10,],rain_tables$`2002`[11,],
             rain_tables$`2002`[12,],rain_tables$`2002`[13,])

raindata = c(rain_tables$`2003`[2,],rain_tables$`2003`[3,],rain_tables$`2003`[4,],rain_tables$`2003`[5,],rain_tables$`2003`[6,],
             rain_tables$`2003`[7,],rain_tables$`2003`[8,],rain_tables$`2003`[9,],rain_tables$`2003`[10,],rain_tables$`2003`[11,],
             rain_tables$`2003`[12,],rain_tables$`2003`[13,])

raindata = c(rain_tables$`2004`[2,],rain_tables$`2004`[3,],rain_tables$`2004`[4,],rain_tables$`2004`[5,],rain_tables$`2004`[6,],
             rain_tables$`2004`[7,],rain_tables$`2004`[8,],rain_tables$`2004`[9,],rain_tables$`2004`[10,],rain_tables$`2004`[11,],
             rain_tables$`2004`[12,],rain_tables$`2004`[13,])

raindata = c(rain_tables$`2005`[2,],rain_tables$`2005`[3,],rain_tables$`2005`[4,],rain_tables$`2005`[5,],rain_tables$`2005`[6,],
             rain_tables$`2005`[7,],rain_tables$`2005`[8,],rain_tables$`2005`[9,],rain_tables$`2005`[10,],rain_tables$`2005`[11,],
             rain_tables$`2005`[12,],rain_tables$`2005`[13,])

raindata = c(rain_tables$`2006`[2,],rain_tables$`2006`[3,],rain_tables$`2006`[4,],rain_tables$`2006`[5,],rain_tables$`2006`[6,],
             rain_tables$`2006`[7,],rain_tables$`2006`[8,],rain_tables$`2006`[9,],rain_tables$`2006`[10,],rain_tables$`2006`[11,],
             rain_tables$`2006`[12,],rain_tables$`2006`[13,])

raindata = c(rain_tables$`2007`[2,],rain_tables$`2007`[3,],rain_tables$`2007`[4,],rain_tables$`2007`[5,],rain_tables$`2007`[6,],
             rain_tables$`2007`[7,],rain_tables$`2007`[8,],rain_tables$`2007`[9,],rain_tables$`2007`[10,],rain_tables$`2007`[11,],
             rain_tables$`2007`[12,],rain_tables$`2007`[13,])

raindata = c(rain_tables$`2008`[2,],rain_tables$`2008`[3,],rain_tables$`2008`[4,],rain_tables$`2008`[5,],rain_tables$`2008`[6,],
             rain_tables$`2008`[7,],rain_tables$`2008`[8,],rain_tables$`2008`[9,],rain_tables$`2008`[10,],rain_tables$`2008`[11,],
             rain_tables$`2008`[12,],rain_tables$`2008`[13,])

raindata = c(rain_tables$`2009`[2,],rain_tables$`2009`[3,],rain_tables$`2009`[4,],rain_tables$`2009`[5,],rain_tables$`2009`[6,],
             rain_tables$`2009`[7,],rain_tables$`2009`[8,],rain_tables$`2009`[9,],rain_tables$`2009`[10,],rain_tables$`2009`[11,],
             rain_tables$`2009`[12,],rain_tables$`2009`[13,])

raindata = c(rain_tables$`2010`[2,],rain_tables$`2010`[3,],rain_tables$`2010`[4,],rain_tables$`2010`[5,],rain_tables$`2010`[6,],
             rain_tables$`2010`[7,],rain_tables$`2010`[8,],rain_tables$`2010`[9,],rain_tables$`2010`[10,],rain_tables$`2010`[11,],
             rain_tables$`2010`[12,],rain_tables$`2010`[13,])

raindata = c(rain_tables$`2011`[2,],rain_tables$`2011`[3,],rain_tables$`2011`[4,],rain_tables$`2011`[5,],rain_tables$`2011`[6,],
             rain_tables$`2011`[7,],rain_tables$`2011`[8,],rain_tables$`2011`[9,],rain_tables$`2011`[10,],rain_tables$`2011`[11,],
             rain_tables$`2011`[12,],rain_tables$`2011`[13,])

raindata = c(rain_tables$`2012`[2,],rain_tables$`2012`[3,],rain_tables$`2012`[4,],rain_tables$`2012`[5,],rain_tables$`2012`[6,],
             rain_tables$`2012`[7,],rain_tables$`2012`[8,],rain_tables$`2012`[9,],rain_tables$`2012`[10,],rain_tables$`2012`[11,],
             rain_tables$`2012`[12,],rain_tables$`2012`[13,])

raindata = c(rain_tables$`2013`[2,],rain_tables$`2013`[3,],rain_tables$`2013`[4,],rain_tables$`2013`[5,],rain_tables$`2013`[6,],
             rain_tables$`2013`[7,],rain_tables$`2013`[8,],rain_tables$`2013`[9,],rain_tables$`2013`[10,],rain_tables$`2013`[11,],
             rain_tables$`2013`[12,],rain_tables$`2013`[13,])

raindata = c(rain_tables$`2014`[2,],rain_tables$`2014`[3,],rain_tables$`2014`[4,],rain_tables$`2014`[5,],rain_tables$`2014`[6,],
             rain_tables$`2014`[7,],rain_tables$`2014`[8,],rain_tables$`2014`[9,],rain_tables$`2014`[10,],rain_tables$`2014`[11,],
             rain_tables$`2014`[12,],rain_tables$`2014`[13,])

raindata = c(rain_tables$`2015`[2,],rain_tables$`2015`[3,],rain_tables$`2015`[4,],rain_tables$`2015`[5,],rain_tables$`2015`[6,],
             rain_tables$`2015`[7,],rain_tables$`2015`[8,],rain_tables$`2015`[9,],rain_tables$`2015`[10,],rain_tables$`2015`[11,],
             rain_tables$`2015`[12,],rain_tables$`2015`[13,])

raindata = c(rain_tables$`2016`[2,],rain_tables$`2016`[3,],rain_tables$`2016`[4,],rain_tables$`2016`[5,],rain_tables$`2016`[6,],
             rain_tables$`2016`[7,],rain_tables$`2016`[8,],rain_tables$`2016`[9,],rain_tables$`2016`[10,],rain_tables$`2016`[11,],
             rain_tables$`2016`[12,],rain_tables$`2016`[13,])


raindata <- gsub("-","0",gsub("T","0",raindata))
raindata <- as.double(raindata)
raindata <- raindata[!is.na(raindata)]
rainday <- c(1:365)
raindata <- as.double(raindata)
rain_frame <- data.frame(rainday,raindata) 

#heavy_rain <-rain_frame$raindata>80  #獴
#heavy_rain <-rain_frame$da>200 #花獴





########################綺########################


setwd("C:/Users/win7/Desktop/earthquake/earth2010")
getwd()
csv_files <- list.files()[grepl('\\.csv', list.files())] # ъ.csv挡Ю郎
csv_tables <- vector('list', length(csv_files))
for (i in seq_along(csv_files))
  csv_tables[[i]] <- read.csv(csv_files[[i]])

eq_tables <- do.call(rbind, csv_tables)
eq_tables <- eq_tables[!is.na(eq_tables$竒),]
eq_data <- eq_tables[grep("浆", eq_tables$綺ァ竚),]
eq_data <- eq_data[,-c(1,3,4,6,8)]

eq_time <- gsub("る","-",gsub("","",gsub("だ","",eq_data[,1])))
eq_time <- substr(eq_time , 1, 6)
eq_data$籓芖丁 <- eq_time
eq <- gsub("ら","",eq_data[,1])
eq_data$籓芖丁 <- eq


tttm <- substr(eq_time , 1, 2)
tttd <- substr(eq_time , 4, 5)
eqm <- gsub("-","",ttt)
eqd <- gsub("ら","",tttd)
qqq <- as.integer(eq)*30 + as.integer(eqd)

########┮Τ綺&┮Τ獴########
day <- strptime(eq_data$籓芖丁,"%m-%d")
plot(day,eq_data$砏家, col="red",type = "h",ylab="綺砏家&獴秖",xlab="",ylim=c(0,6))
par(new=TRUE)
plot(rain_frame$rainday,rain_frame$raindata,type = "h",ylim=c(0,250),axes = F,ylab=NA,xlab=NA,lwd=3)
axis(side = 4)
legend("topleft",legend=c("綺砏家", "獴秖(mm)"),
       lty=c(1,1), pch=c(NA, NA), col=c("red3", "black"))

########┮Τ綺&獴########
heavy_rain <-rain_frame[rain_frame$raindata>50,]
day <- strptime(eq_data$籓芖丁,"%m-%d")
plot(day,eq_data$砏家,
     col="red",type="h",ylim=c(0,6),ylab="綺砏家&獴秖",xlab="")
par(new=TRUE)
plot(heavy_rain$rainday,heavy_rain$raindata,
     lwd=3,xaxt="n",xlim=c(1,365),ylim=c(0,250), yaxt="n",ylab="",xlab="",type="h")
axis(side = 4)
legend("topleft",legend=c("綺砏家", "獴秖(mm)"),
       lty=c(1,1), pch=c(NA, NA), col=c("red3", "black"))

########い砏家&┮Τ獴########

heavy_eq <- eq_data[eq_data$砏家>3.5,] #い砏家
dayh <- strptime(heavy_eq$籓芖丁,"%m-%d")
plot(dayh,heavy_eq$砏家, 
     col="red",type="h",ylim=c(0,6),ylab="綺砏家&獴秖",xlab="")
par(new=TRUE)
plot(rain_frame$rainday,rain_frame$raindata,type = "h",ylim=c(0,250),axes = F,ylab=NA,xlab=NA,lwd=3)
axis(side = 4)
legend("topleft",legend=c("綺砏家", "獴秖(mm)"),
       lty=c(1,1), pch=c(NA, NA), col=c("red3", "black"))

########い砏家&獴########
heavy_rain <-rain_frame[rain_frame$raindata>50,]

heavy_eq <- eq_data[eq_data$砏家>3.5,] #い砏家
dayh <- strptime(heavy_eq$籓芖丁,"%m-%d")
plot(dayh,heavy_eq$砏家, 
     col="red",type="h",ylim=c(0,6),ylab="綺砏家&獴秖",xlab="")
par(new=TRUE)
plot(heavy_rain$rainday,heavy_rain$raindata,
     type="h",lwd=3,xaxt="n",xlim=c(1,365),ylim=c(0,250), yaxt="n",ylab="",xlab="")
axis(side = 4)
legend("topleft",legend=c("綺砏家", "獴秖(mm)"),
       lty=c(1,1), pch=c(NA, NA), col=c("red3", "black"))



###############綺Ω计&┮Τ獴秖################
eq_data1 <- eq_tables[grep("浆", eq_tables$綺ァ竚),]
eqtime <- substr(eq_data1$籓芖丁,start=1,stop=5)
eq_count <- as.data.frame(table(eqtime))
eq_count_day <- gsub("る","-",gsub("ら","",eq_count[,1]))
eq_count_day <- strptime(eq_count_day,"%m-%d")
eq_count$eqtime <- eq_count_day

plot(eq_count$eqtime,eq_count$Freq, col="orange4",type = "h",ylab="綺Ω计&獴秖",xlab="",ylim=c(0,6))
par(new=TRUE)
plot(rain_frame$rainday,rain_frame$raindata,type = "h",axes = F,ylab=NA,xlab=NA,lwd=3,ylim=c(0,250))
axis(side = 4)
legend("topleft",legend=c("綺Ω计", "獴秖(mm)"),
       lty=c(1,1), pch=c(NA, NA), col=c("orange4", "black"))


